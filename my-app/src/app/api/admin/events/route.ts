import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

const MY_KEY = "HomeEvents";

export const POST = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized"}, {status: 401});
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason}, {status: 403});
    }

    const { eventId, eventLink, eventName, eventDate, eventVenue } = await req.json();

    if (!eventLink || !eventName || !eventDate || !eventVenue || !eventId) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    await pool.query('START TRANSACTION');

    await pool.query(
      `UPDATE events 
       SET event_link = ?, event_name = ?, event_date = ?, event_venue = ?
       WHERE id = ?`,
      [eventLink, eventName, eventDate, eventVenue, eventId]
    );

    await pool.query('COMMIT');
    await redisClient.del(MY_KEY);

    return NextResponse.json({ message: "Event updated successfully"}, {status: 200});
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in POST /api/admin/events:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }

    const [events] = await pool.query(
      `SELECT * FROM events ORDER BY upload_at DESC LIMIT 4;`
    );


    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/admin/events:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};
