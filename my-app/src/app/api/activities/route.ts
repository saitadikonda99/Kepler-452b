import { copyFileSync } from "fs";
import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { verifyJWT } from "../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  try {


    const { valid, payload } = await verifyJWT();


    const [result]: any = await pool.query(
      `SELECT id, club_id, activity_name, activity_type, club_name, activity_date, venue, report_link
        FROM (
            SELECT *, 
                ROW_NUMBER() OVER (PARTITION BY activity_name ORDER BY activity_date) AS row_num
            FROM club_activities
        ) AS unique_activities
        WHERE row_num = 1;
      `);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};