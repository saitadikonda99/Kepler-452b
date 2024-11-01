import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware"

const getHandler = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles({ ...payload, role: payload.role || 'User' }, 'Admin');

    if (!authorized) {
      return NextResponse.json({ message: roleReason }, { status: 403 });
    }

    const [result]: any = await pool.query( 
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

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in getClubDetails:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

export const GET = withMiddleware(getHandler);
