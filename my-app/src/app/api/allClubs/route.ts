import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../lib/verifyJWT";
import { verifyRoles } from "../../../lib/verifyRoles";
import { withMiddleware } from "../../../middleware/middleware"

const handler = async (req: NextRequest) => {

  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  if (!payload) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const { authorized, reason: roleReason } = verifyRoles({ ...payload, role: payload.role || 'User' }, 'Admin', 'club_lead');

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }

  try {
    const [clubDetails] = await pool.query(`
            SELECT 
          c.id AS id,
          c.club_id AS club_id,
          c.club_name,
          u.username AS lead_username,
          u.name AS lead_name,
          u.email AS lead_email,
          cd.club_description,
          cd.club_domain,
          cd.club_logo
            FROM 
                clubs c
            LEFT JOIN 
                users u ON c.lead_id = u.id  -- Left join to get NULL if there's no lead
            JOIN 
                club_data cd ON c.id = cd.club_id;

      `);

    const club = clubDetails as any[];

    return NextResponse.json(club, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};


export const GET = withMiddleware(handler);