import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { verifyJWT } from "../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    const [result]: any = await pool.query(
      `SELECT 
            id,
            ClubName as club_name,
            clubDomain as club_domain,
            ActivityName as activity_name,
            ActivityDate as activity_date,
            ActivityVenue as activity_venue,
            ActivityType as activity_type,
            ActivityReportLink as activity_report,
            ActivityParticipants as total_participants
        FROM 
            overall_activities
        ORDER BY 
            ActivityDate DESC`
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};