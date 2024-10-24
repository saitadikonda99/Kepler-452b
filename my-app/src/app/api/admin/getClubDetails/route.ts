import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware"

const getHandler = async (req: NextRequest) => {
  const connection = await pool.getConnection();

  try {
    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles({ ...payload, role: payload.role || 'User' }, 'Admin');

    if (!authorized) {
      return NextResponse.json({ message: roleReason }, { status: 403 });
    }

    const MY_KEY = "getClubDetails"

    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }


    try {
      const [result]: any = await connection.query( 
        `SELECT 
            u.id AS user_id,
            u.username,
            u.name AS user_name,
            u.email,
            u.role,
            c.id AS club_id,
            c.club_name,
            c.club_domain,
            c.club_description,
            c.club_about,
            c.club_logo,
            c.upload_at,
            c.active
        FROM 
            clubs c
        LEFT JOIN 
            users u ON u.id = c.lead_id`
      );

      await redisClient.setEx(MY_KEY, 3600, JSON.stringify(result));

      return NextResponse.json(result, { status: 200 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error in getClubDetails:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  } finally {
    connection.release();
  }
};

export const GET = withMiddleware(getHandler);
