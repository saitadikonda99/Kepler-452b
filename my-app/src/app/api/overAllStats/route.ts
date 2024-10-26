import { copyFileSync } from "fs";
import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const [result]: any = await pool.query(
      `SELECT 
                SUM(total_members) AS total_members,
                SUM(total_activities) AS total_activities,
                SUM(total_projects) AS total_projects
            FROM 
                stats AS s1
            WHERE 
                s1.upload_at = (
                    SELECT MAX(s2.upload_at)
                    FROM stats AS s2
                    WHERE s1.club_id = s2.club_id
                );
        `
    );

    redisClient.setEx("overAllStats", 3600, JSON.stringify(result));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
