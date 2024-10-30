import { copyFileSync } from "fs";
import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { verifyJWT } from "../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    
    const { valid, payload } = await verifyJWT();


    if (!valid) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const userData: any = payload;

    const leadId = userData.id;

    const [clubData]: any = await pool.query(
      `SELECT id, club_name FROM clubs WHERE lead_id = ?`,
      [leadId]
    );

    const clubId = clubData[0]?.id;

    const [result]: any = await pool.query(
        `SELECT
            (SELECT COUNT(DISTINCT student_id) FROM student_registration WHERE club_id = ?) AS total_members,
            (SELECT COUNT(DISTINCT activity_name) FROM club_activities WHERE club_id = ?) AS total_activities,
            (SELECT COUNT(DISTINCT name) FROM club_projects WHERE club_id = ?) AS total_projects
        `, [clubId, clubId, clubId]);
      
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};