import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

const MY_KEY = "HomeEvents";

export const POST = async (req: any) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  if (!payload) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const { authorized, reason: roleReason } = verifyRoles(
    { ...payload, role: payload.role || "User" },
    "Admin"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }

  try {
    const { eventId, eventLink, eventName, eventDate, eventVenue } =
      await req.json();

    if (!eventLink || !eventName || !eventDate || !eventVenue || !eventId) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    const response = await pool.query(
      `
          INSERT INTO events (event_link, event_name, event_date, event_venue)
          VALUES (?, ?, ?, ?)
            `,
      [eventLink, eventName, eventDate, eventVenue, eventId]
    );

    redisClient.del(MY_KEY);

    return NextResponse.json({ message: "Event created", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }

    const response = await pool.query(
      `
        SELECT * FROM events ORDER BY upload_at DESC LIMIT 4;
      `
    );

    const events = response[0];

    redisClient.setEx(MY_KEY, 3600, JSON.stringify(events));

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};
