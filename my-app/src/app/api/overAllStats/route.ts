import { copyFileSync } from "fs";
import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../lib/verifyJWT";

export const GET = async (req: NextRequest) => {
  try {

    const { valid, payload } = await verifyJWT();

    const [result]: any = await pool.query(
      `SELECT
        (SELECT COUNT(DISTINCT id_number) FROM user_details) AS total_members,
        (SELECT COUNT(DISTINCT session_name) FROM sessions) AS total_activities,
        (SELECT COUNT(DISTINCT name) FROM club_projects) AS total_projects,
        (SELECT COUNT(DISTINCT club_name) FROM clubs) AS total_clubs;
      `);

    console.log(result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};