import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";

const putHandler = async (req: NextRequest) => {
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
      id,
      clubId,
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

    await pool.query('START TRANSACTION');

    // Verify session belongs to club
    const [sessionCheck]: any = await pool.query(
      `SELECT id FROM sessions WHERE id = ? AND session_club_id = ?`,
      [id, clubId]
    );

    if (sessionCheck.length === 0) {
      await pool.query('ROLLBACK');
      return NextResponse.json({ message: "Invalid session for selected club" }, { status: 400 });
    }

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
       WHERE id = ? AND session_club_id = ?`,
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
        id,
        clubId
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

    await pool.query('COMMIT');

    return NextResponse.json({ message: "Session updated successfully" }, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error updating session:", error);
    let errorMessage = "Server error while updating session";
    if (error.message.includes("Incorrect date value")) {
      errorMessage = "Invalid date format for session date";
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};

const postHandler = async (req: NextRequest) => {
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
    const { sessionId, isActive } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
    }

    await pool.query('START TRANSACTION');

    // Update session status
    await pool.query(
      `UPDATE sessions SET is_active = ? WHERE id = ?`,
      [isActive, sessionId]
    );

    await pool.query('COMMIT');

    return NextResponse.json({ message: "Session status updated successfully" }, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error updating session status:", error);
    return NextResponse.json({ message: error.message || "Server error while updating session status" }, { status: 500 });
  }
};

const deleteHandler = async (req: NextRequest) => {
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
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
    }

    await pool.query('START TRANSACTION');

    // Verify session belongs to club
    const [sessionCheck]: any = await pool.query(
      `SELECT id FROM sessions WHERE id = ?`,
      [sessionId]
    );

    if (sessionCheck.length === 0) {
      await pool.query('ROLLBACK');
      return NextResponse.json({ message: "Invalid session" }, { status: 400 });
    }

    // Delete session attendance records
    await pool.query(
      `DELETE FROM session_attendance WHERE session_id = ?`,
      [sessionId]
    );

    // Delete session in-charges
    await pool.query(
      `DELETE FROM session_inCharges WHERE session_id = ?`,
      [sessionId]
    );

    // Delete session
    await pool.query(
      `DELETE FROM sessions WHERE id = ?`,
      [sessionId]
    );

    await pool.query('COMMIT');

    return NextResponse.json({ message: "Session deleted successfully" }, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error deleting session:", error);
    return NextResponse.json({ message: error.message || "Server error while deleting session" }, { status: 500 });
  }
};

export const PUT = withMiddleware(putHandler);
export const POST = withMiddleware(postHandler);
export const DELETE = withMiddleware(deleteHandler);