import { copyFileSync } from "fs";
import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const [result]: any = await pool.query(
      `SELECT
        (SELECT COUNT(DISTINCT student_id) FROM student_registration) AS total_members,
        (SELECT COUNT(DISTINCT activity_name) FROM club_activities) AS total_activities,
        (SELECT COUNT(DISTINCT name) FROM club_projects) AS total_projects;
      `);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};