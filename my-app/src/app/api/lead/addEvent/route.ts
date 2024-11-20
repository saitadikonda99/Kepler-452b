import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";
import { redisClient } from "../../../../config/redis";

const postHandler = async (req: NextRequest) => {

  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized"}, {status: 401});
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason}, {status: 403});
  }

  try {
    const { event_name, event_date, start_time, end_time, event_venue, resource_person, event_inCharge, event_logo } = await req.json();
    
    const [result] = await pool.query(
        `INSERT INTO upcoming_events (event_name, event_date, start_time, end_time, event_venue, resource_person, event_inCharge, event_logo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [event_name, event_date, start_time, end_time, event_venue, resource_person, event_inCharge, event_logo]
    );

    return NextResponse.json({ message: "Event added successfully"}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  } 
};

const getHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized"}, {status: 401});
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason}, {status: 403});
  }

  try {
    
    const [clubData]: any = await pool.query(
      `SELECT * FROM clubs WHERE lead_id = ?`,
      [userData.id]
    );

    const clubId = clubData[0].id;

    const [eventData]: any = await pool.query(
      `SELECT * FROM upcoming_events WHERE club_id = ?`,
      [clubId]
    );

    console.log(eventData);

    return NextResponse.json(eventData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  } 
};

export const GET = withMiddleware(getHandler);
export const POST = withMiddleware(postHandler);