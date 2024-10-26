import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";

const handler = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason, status: 403 });
    }

    const [users] = await pool.query(`
      SELECT u.id, u.username, u.name, u.email, u.role, u.active,
        CASE 
            WHEN u.role = 'club_lead' THEN c.club_name
            ELSE 'N/A'
        END AS club_name
        FROM users u
        LEFT JOIN clubs c ON u.id = c.lead_id
    `);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/admin/manageUsers:", error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}

export const GET = withMiddleware(handler);
