import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";

export const GET = withMiddleware(async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userData: any = payload;
  const { authorized } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin"
  );

  if (!authorized) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
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
        sa.attendance_status AS 'present',
        sa.extra_points AS 'extra_points',
        sa.attendance_date AS 'last_updated'
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
        sa.session_id = ?`,
      [sessionId]
    );
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
});

export const POST = withMiddleware(async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userData: any = payload;
  const { authorized } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin"
  );

  if (!authorized) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const { sessionId, attendanceData, applyNegativePoints } = await req.json();

    await pool.query('START TRANSACTION');

    const [sessionResult]: any = await pool.query(
      `SELECT session_points, session_neg_points FROM sessions WHERE id = ?`,
      [sessionId]
    );

    const sessionPoints = sessionResult[0].session_points;
    const negativePoints = sessionResult[0].session_neg_points;

    for (const student of attendanceData) {
      await pool.query(
        `UPDATE session_attendance sa
         JOIN users u ON sa.user_id = u.id
         JOIN user_details ud ON u.id = ud.user_id
         SET sa.attendance_status = ?,
             sa.extra_points = ?,
             sa.attendance_points = CASE 
               WHEN ? = 'Present' THEN ?
               WHEN ? = true AND ? = 'Absent' THEN -?
               ELSE 0 
             END,
             sa.attendance_date = CURRENT_TIMESTAMP
         WHERE sa.session_id = ? AND ud.id_number = ?`,
        [
          student.present ? 'Present' : 'Absent',
          student.extra_points,
          student.present ? 'Present' : 'Absent',
          sessionPoints,
          applyNegativePoints,
          student.present ? 'Present' : 'Absent',
          negativePoints,
          sessionId,
          student.username
        ]
      );
    }

    await pool.query('COMMIT');
    return NextResponse.json({ message: "Attendance updated successfully" }, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}); 