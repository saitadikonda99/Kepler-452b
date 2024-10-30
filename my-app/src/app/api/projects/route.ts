import { copyFileSync } from "fs";
import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  try {
    const [result]: any = await pool.query(
      `SELECT id, club_id, name, description, club_name
            FROM (
                SELECT *, 
                    ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) AS row_num
                FROM club_projects
            ) AS unique_projects
            WHERE row_num = 1;
      `,);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};