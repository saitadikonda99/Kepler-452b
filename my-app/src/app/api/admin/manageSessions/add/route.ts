import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";

const postHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userData: any = payload;
  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason }, { status: 403 });
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
      clubId,
      sessionFor,
    } = await req.json();

    if (
      !sessionName ||
      !sessionType ||
      !sessionDate ||
      !sessionStartTime ||
      !sessionEndTime ||
      !sessionVenue ||
      !sessionCourseId ||
      !sessionPoints ||
      !sessionNegPoints ||
      !sessionResourcePerson ||
      !sessionInCharges ||
      !clubId
    ) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await pool.query("START TRANSACTION");

    const [courseCheck]: any = await pool.query(
      `SELECT id FROM courses WHERE id = ? AND club_id = ?`,
      [sessionCourseId, clubId]
    );

    if (courseCheck.length === 0) {
      await pool.query("ROLLBACK");
      return NextResponse.json({ message: "Invalid course for selected club" }, { status: 400 });
    }

    const [leadId]: any = await pool.query(`SELECT lead_id FROM clubs WHERE id = ?`, [clubId]);

    if (leadId.length === 0) {
      await pool.query("ROLLBACK");
      return NextResponse.json({ message: "Club not found" }, { status: 404 });
    }

    const lead_id = leadId[0].lead_id;

    const [sessionResult]: any = await pool.query(
      `INSERT INTO sessions (
        academic_year_id, session_name, session_type, session_date, 
        session_sTime, session_eTime, session_venue, session_course_id, 
        session_points, session_neg_points, session_resource_person, 
        session_club_id, session_lead_id, is_active, session_for
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        academicYearId,
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
        clubId,
        lead_id,
        1,
        sessionFor || "all",
      ]
    );

    const sessionId = sessionResult.insertId;

    for (const inCharge of sessionInCharges) {
      await pool.query(`INSERT INTO session_inCharges (session_id, user_id) VALUES (?, ?)`, [sessionId, inCharge]);
    }

    const [students]: any[] = await pool.query(
      `SELECT cr.user_id
      FROM course_registrations cr
      JOIN user_details ud ON cr.user_id = ud.user_id
      WHERE cr.course_id = ? 
      ${sessionFor !== "all" ? "AND ud.residency = ?" : ""}`,
      sessionFor === "all" ? [sessionCourseId] : [sessionCourseId, sessionFor]
    );

    for (const student of students) {
      await pool.query(
        `INSERT INTO session_attendance 
        (session_id, user_id, attendance_status, attendance_points) 
        VALUES (?, ?, 'Absent', 0)`,
        [sessionId, student.user_id]
      );
    }

    for (const inCharge of sessionInCharges) {
      await pool.query(
        `INSERT INTO session_attendance 
        (session_id, user_id, attendance_status, attendance_points) 
        VALUES (?, ?, 'Present', ?)`,
        [sessionId, inCharge, sessionPoints]
      );
    }

    await pool.query(
      `INSERT INTO session_attendance 
      (session_id, user_id, attendance_status, attendance_points) 
      VALUES (?, ?, 'Present', ?)`,
      [sessionId, sessionResourcePerson, sessionPoints]
    );

    await pool.query("COMMIT");

    return NextResponse.json({ message: "Session added successfully" }, { status: 200 });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error adding session:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
};

export const POST = withMiddleware(postHandler);