import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

export const POST = async (req: any) => {


  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  if (!payload) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const { authorized, reason: roleReason } = verifyRoles({ ...payload, role: payload.role || 'User' }, 'Admin');

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }


  try {
    const { eventId, eventLink, eventName, eventDate, eventVenue } = await req.json();

    console.log(eventDate);

    if (!eventLink || !eventName || !eventDate || !eventVenue || !eventId) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    const response = await pool.query(
      `
          UPDATE events
          SET event_link = ?, event_name = ?, event_date = ?, event_venue = ?
          WHERE id = ?
            `,
      [eventLink, eventName, eventDate, eventVenue, eventId]
    );

    const event = response[0];

    if (!event) {
      return NextResponse.json({ message: "Event not created", status: 500 });
    }

    return NextResponse.json({ message: "Event created", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const response = await pool.query(
      `
            SELECT * FROM events ORDER BY upload_at DESC LIMIT 4;
            `
    );

    const events = response[0];

    console.log(events);

    if (!events) {
      return NextResponse.json({ message: "No events found", status: 404 });
    }

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};
