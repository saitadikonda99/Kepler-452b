import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

export async function PUT(req: NextRequest) {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userData: any = payload;
  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason }, { status: 403 });
  }

  try {
    const {
      id,
      sessionName,
      sessionType,
      sessionDate,
      sessionSTime,
      sessionETime,
      sessionVenue,
      sessionPoints,
      sessionNegPoints,
      sessionResourcePerson,
      sessionInCharges,
      academicYearId,
      sessionCourseId
    } = await req.json();

    // Update main session data
    await pool.query(
      `UPDATE sessions 
       SET session_name = ?,
           session_type = ?,
           session_date = ?,
           session_sTime = ?,
           session_eTime = ?,
           session_venue = ?,
           session_points = ?,
           session_neg_points = ?,
           session_resource_person = ?,
           academic_year_id = ?,
           session_course_id = ?,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        sessionName,
        sessionType,
        sessionDate,
        sessionSTime,
        sessionETime,
        sessionVenue,
        sessionPoints,
        sessionNegPoints,
        sessionResourcePerson,
        academicYearId,
        sessionCourseId,
        id
      ]
    );

    // Update in-charges
    if (sessionInCharges && sessionInCharges.length > 0) {
      // First delete existing in-charges
      await pool.query(
        `DELETE FROM session_inCharges WHERE session_id = ?`,
        [id]
      );

      // Insert new in-charges
      const inChargeValues = sessionInCharges.map(inCharge => [id, inCharge]);
      await pool.query(
        `INSERT INTO session_inCharges (session_id, user_id) VALUES ?`,
        [inChargeValues]
      );
    }

    return NextResponse.json({ message: "Session updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}