import { copyFileSync } from "fs";
import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { NextRequest, NextResponse } from "next/server";


export const GET  = async (req: NextRequest) => {

  try {
        const MY_KEY = 'overAllStats';

        const data = await redisClient.get(MY_KEY);

        if (data) {
            return NextResponse.json(JSON.parse(data), { status: 200 });
        }

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

        redisClient.setEx(MY_KEY, 3600, JSON.stringify(result));

        return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error}, { status: 500 });
  }
};
