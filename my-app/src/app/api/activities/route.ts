import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { verifyJWT } from "../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    const [result]: any = await pool.query(
      `SELECT 
            s.id AS session_id,
            s.session_name,
            s.session_type,
            s.session_date,
            s.session_sTime,
            s.session_eTime,
            s.session_venue,
            s.session_report,
            s.is_active AS session_status,
            s.updated_at,
            COUNT(sa.id) AS total_participants,
            c.club_name,
            c.club_domain,
            co.course_name,
            co.course_code
        FROM 
            sessions s
        JOIN 
            session_attendance sa ON s.id = sa.session_id
        LEFT JOIN 
            clubs c ON s.session_club_id = c.id
        LEFT JOIN
            courses co ON s.session_course_id = co.id
        WHERE
            c.active = 1
        GROUP BY 
            s.id
        ORDER BY 
            s.session_date DESC, s.session_sTime DESC`
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};