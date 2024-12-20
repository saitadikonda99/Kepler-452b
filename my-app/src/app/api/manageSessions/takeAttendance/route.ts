import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";
import { redisClient } from "../../../../config/redis";

const getHandler = async (req: NextRequest) => {

  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized"}, {status: 401});
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason}, {status: 403});
  }

  const sessionId = req.nextUrl.searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
  }

  try {
    const [result]: any = await pool.query(
        `SELECT 
            ud.id_number AS 'username',
            ud.name AS 'name',
            c.course_name AS 'course',
            ud.branch AS 'branch',
            CASE 
                WHEN sa.attendance_status = 'Present' THEN 'Present'
                ELSE 'Absent'
            END AS attendance_status,
            sa.extra_points,
            sa.attendance_date AS 'last_updated',
            s.session_name AS 'session_name'
        FROM 
            session_attendance sa
        JOIN 
            users u ON sa.user_id = u.id
        JOIN 
            user_details ud ON u.id = ud.user_id
        JOIN 
            sessions s ON s.id = sa.session_id
        JOIN 
            courses c ON c.id = s.session_course_id
        WHERE 
            sa.session_id = ?;
        `,
        [sessionId]
    );
    
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  }
    
};

export const GET = withMiddleware(getHandler);

export async function POST(req: NextRequest) {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userData: any = payload;
  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason }, { status: 403 });
  }

  try {
    const { sessionId, attendanceData, applyNegativePoints } = await req.json();

    await pool.query('START TRANSACTION');

    // Get session details
    const [sessionResult]: any = await pool.query(
      `SELECT session_points, session_neg_points, session_resource_person FROM sessions WHERE id = ?`,
      [sessionId]
    );

    if (!sessionResult || sessionResult.length === 0) {
      throw new Error('Session not found');
    }

    const sessionPoints = sessionResult[0].session_points;
    const negativePoints = sessionResult[0].session_neg_points;
    const resourcePersonId = sessionResult[0].session_resource_person;

    // Get inCharges for this session
    const [inChargeResult]: any = await pool.query(
      `SELECT user_id FROM session_inCharges WHERE session_id = ?`,
      [sessionId]
    );
    const inChargeIds = new Set(inChargeResult.map((row: any) => row.user_id));

    // Get user IDs for all students
    const [userIds]: any = await pool.query(
      `SELECT u.id, ud.id_number 
       FROM users u 
       JOIN user_details ud ON u.id = ud.user_id 
       WHERE ud.id_number IN (?)`,
      [attendanceData.map(s => s.username)]
    );

    const userIdMap = new Map(userIds.map((u: any) => [u.id_number, u.id]));

    // Update attendance records
    for (const student of attendanceData) {
      const userId = userIdMap.get(student.username);
      const isResourcePerson = userId === resourcePersonId;
      const isInCharge = inChargeIds.has(userId);

      // Determine attendance status and points
      const attendanceStatus = student.present === 'Present' ? 'Present' : 'Absent';
      const attendancePoints = attendanceStatus === 'Present' ? sessionPoints : 
                             (applyNegativePoints ? -negativePoints : 0);
      const resourcePersonPoints = isResourcePerson && attendanceStatus === 'Present' ? 20 : 0;
      const inChargePoints = isInCharge && attendanceStatus === 'Present' ? 20 : 0;

      // Update the database
      await pool.query(
        `UPDATE session_attendance 
         SET attendance_status = ?,
             attendance_points = ?,
             resource_person_points = ?,
             inCharge_points = ?,
             extra_points = ?
         WHERE session_id = ? AND user_id = ?`,
        [
          attendanceStatus,
          attendancePoints,
          resourcePersonPoints,
          inChargePoints,
          student.extra_points || 0,
          sessionId,
          userId
        ]
      );
    }

    // Update session timestamp
    await pool.query(
      `UPDATE sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [sessionId]
    );

    await pool.query('COMMIT');
    
    return NextResponse.json({ message: "Attendance updated successfully" }, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    return NextResponse.json({ 
      message: "Server error", 
      error: error.message 
    }, { status: 500 });
  }
}