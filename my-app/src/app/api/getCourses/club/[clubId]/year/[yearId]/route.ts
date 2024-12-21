import { pool } from "../../../../../../../config/db";
import { verifyJWT } from "../../../../../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { clubId: string, yearId: string } }
) => {
  try {
    const { valid, payload } = await verifyJWT();
    
    if (!valid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { clubId, yearId } = params;

    if (!clubId || !yearId) {
      return NextResponse.json({ message: "Club ID and Academic Year ID are required" }, { status: 400 });
    }

    const [result]: any = await pool.query(
      `SELECT 
            courses.id AS course_id,
            courses.course_code,
            courses.course_name,
            courses.course_handout,
            courses.course_level,
            courses.register_students,
            courses.course_slots,
            courses.is_active AS course_active,
            courses.club_id,
            clubs.club_name,
            clubs.club_domain,
            clubs.club_description,
            clubs.active AS club_active
        FROM 
            courses
        INNER JOIN 
            clubs ON courses.club_id = clubs.id
        WHERE 
            courses.club_id = ? AND courses.academic_year_id = ?
            AND courses.is_active = 1
            AND clubs.active = 1
        ORDER BY 
            courses.course_code ASC`, 
      [clubId, yearId]
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in clubCourses:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}; 