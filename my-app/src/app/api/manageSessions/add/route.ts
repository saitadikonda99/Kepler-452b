import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";
import { redisClient } from "../../../../config/redis";

const postHandler = async (req: NextRequest) => {

  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized"}, {status: 401});
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason}, {status: 403});
  }

  try {
    const { 
      sessionName,
      sessionType,
      sessionDate,
      sessionStartTime,
      sessionEndTime,
      sessionVenue,
      academicYearId,
      sessionCourseId,
      sessionPoints,
      sessionNegPoints,
      sessionResourcePerson,
      sessionInCharges,
      sessionFor,
    } = await req.json();

    console.log(sessionNegPoints);

    if (!sessionName || !sessionType || !sessionDate || !sessionStartTime || !sessionEndTime || !sessionVenue || !sessionCourseId || !sessionPoints || !sessionNegPoints || !sessionResourcePerson || !sessionInCharges) {
      return NextResponse.json({ message: "All fields are required"}, { status: 400 });
    }

    const leadId = userData.id;

    const [result]: any = await pool.query(
      `SELECT * FROM clubs WHERE lead_id = ?`,
      [leadId]
    );

    const clubId = result[0].id;

    console.log(clubId);

    await pool.query('START TRANSACTION');

    const [sessionResult]: any = await pool.query(
      `INSERT INTO sessions (academic_year_id, session_name, session_type, session_date, session_sTime, session_eTime, session_venue, session_course_id, session_points, session_neg_points, session_resource_person, session_club_id, session_lead_id, session_for)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [academicYearId, sessionName, sessionType, sessionDate, sessionStartTime, sessionEndTime, sessionVenue, sessionCourseId, sessionPoints, sessionNegPoints, sessionResourcePerson, clubId, leadId, sessionFor]
    );

    const sessionId = sessionResult.insertId;

    for (const inCharge of sessionInCharges) {
      await pool.query(
        `INSERT INTO session_inCharges (session_id, user_id) VALUES (?, ?)`,
        [sessionId, inCharge]
      );
    }

    const [students]: any[] = await pool.query(
      `SELECT 
        cr.user_id
      FROM course_registrations cr
      JOIN user_details ud ON cr.user_id = ud.user_id
      WHERE cr.course_id = ? 
      ${sessionFor !== 'all' ? 'AND ud.residency = ?' : ''}`,
      sessionFor === 'all' ? 
        [sessionCourseId] : 
        [sessionCourseId, sessionFor]
    );
    
    console.log("Session For:", sessionFor);
    console.log("Query Results:", students);

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
    console.log(error);
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  }
    
};


export const POST = withMiddleware(postHandler);