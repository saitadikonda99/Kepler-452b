import { pool } from "../../../../../config/db";
import { redisClient } from "../../../../../config/redis";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();
    
    if (!valid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const leadId = payload.id;

    const [clubData]: any = await pool.query(`
        SELECT 
            *
        FROM 
            clubs
        WHERE 
            lead_id = ?
        `, [leadId]);

    if (!clubData || clubData.length === 0) {
      return NextResponse.json({ message: "No club found for this lead" }, { status: 404 });
    }

    const clubId = clubData[0].id;

    const academicYearId = req.nextUrl.pathname.split("/").pop()

    console.log(academicYearId)

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
        ORDER BY 
            courses.course_code ASC`, 
      [clubId, academicYearId]
    );

    console.log(result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in clubCourses:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};