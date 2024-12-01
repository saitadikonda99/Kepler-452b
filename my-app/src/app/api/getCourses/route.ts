import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { verifyJWT } from "../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {

    const KEY = "getAllCourses";
    
    const { valid, payload } = await verifyJWT();
    
    const academicYearId = req.nextUrl.pathname.split("/").pop();

    const cachedData = await redisClient.get(KEY);
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData), { status: 200 });
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
            clubs
        ON 
            courses.club_id = clubs.id;`
    );

    redisClient.set(KEY, JSON.stringify(result), { EX: 60 * 60 * 24 });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};