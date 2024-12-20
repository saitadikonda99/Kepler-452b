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
  const { searchParams } = new URL(req.url);
  const academicYearId = searchParams.get('academicYearId');
  const courseId = searchParams.get('courseId');

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason}, {status: 403});
  }

  try {
    const [clubId]: any = await pool.query(
      `SELECT id FROM clubs WHERE lead_id = ?`,
      [userData.id]
    );
    
    let query = `SELECT * FROM sessions WHERE session_club_id = ?`;
    let params = [clubId[0].id];

    if (academicYearId) {
      query += ` AND academic_year_id = ?`;
      params.push(academicYearId);
    }

    if (courseId) {
      query += ` AND session_course_id = ?`;
      params.push(courseId);
    }

    const [result]: any = await pool.query(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    await pool.query('ROLLBACK');
    console.log(error);
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  }
};

export const GET = withMiddleware(getHandler);