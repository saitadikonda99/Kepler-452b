import { copyFileSync } from "fs";
import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {

    
    const { valid, payload } = await verifyJWT();
    
    const academicYearId = req.nextUrl.pathname.split("/").pop();
    
    const KEY = `getCourses`;

    const cache = await redisClient.get(KEY);

    if (cache) {
      return NextResponse.json(JSON.parse(cache), { status: 200 });
    }

    const [result]: any = await pool.query(
      `SELECT *, (course_slots - register_students) AS available_slots 
       FROM courses 
       WHERE is_active = 1 
         AND academic_year_id = ?
         AND (course_slots - register_students) > 0`,
      [academicYearId]
    );

    await redisClient.setEx(KEY, 3600, JSON.stringify(result));
  

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};