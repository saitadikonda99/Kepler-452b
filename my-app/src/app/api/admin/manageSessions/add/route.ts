import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";

const postHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized"}, {status: 401});
  }

  const userData: any = payload;
  const { authorized } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin"
  );

  if (!authorized) {
    return NextResponse.json({ message: "Forbidden"}, {status: 403});
  }

  try {
    const { 
      clubId,
      sessionName,
      sessionType,
      sessionDate,
      sessionStartTime,
      sessionEndTime,
      sessionVenue,
      sessionCourseId,
      sessionPoints,
      sessionNegPoints,
      sessionResourcePerson,
      sessionInCharges,
    } = await req.json();

    if (!clubId || !sessionName || !sessionType || !sessionDate || !sessionStartTime || 
        !sessionEndTime || !sessionVenue || !sessionCourseId || !sessionPoints || 
        !sessionNegPoints || !sessionResourcePerson || !sessionInCharges) {
      return NextResponse.json({ message: "All fields are required"}, { status: 400 });
    }

    await pool.query('START TRANSACTION');

    const [clubResult]: any = await pool.query(
      `SELECT lead_id FROM clubs WHERE id = ?`,
      [clubId]
    );

    const leadId = clubResult[0].lead_id;

    const [sessionResult]: any = await pool.query(
      `INSERT INTO sessions (
        session_name, session_type, session_date, session_sTime, session_eTime, 
        session_venue, session_course_id, session_points, session_neg_points, 
        session_resource_person, session_club_id, session_lead_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sessionName, sessionType, sessionDate, sessionStartTime, sessionEndTime, 
       sessionVenue, sessionCourseId, sessionPoints, sessionNegPoints, 
       sessionResourcePerson, clubId, leadId]
    );

    const sessionId = sessionResult.insertId;

    for (const inCharge of sessionInCharges) {
      await pool.query(
        `INSERT INTO session_inCharges (session_id, user_id) VALUES (?, ?)`,
        [sessionId, inCharge]
      );
    }

    const [students]: any = await pool.query(
      `SELECT cr.user_id
       FROM course_registrations cr
       WHERE cr.course_id = ?`,
      [sessionCourseId]
    );

    for (const student of students) {
      await pool.query(
        `INSERT INTO session_attendance 
         (session_id, user_id, attendance_status, attendance_points) 
         VALUES (?, ?, 'Absent', 0)`,
        [sessionId, student.user_id]
      );
    }

    await pool.query('COMMIT');
    return NextResponse.json({ message: "Session added successfully"}, { status: 200 });

  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  }
};

export const POST = withMiddleware(postHandler); 