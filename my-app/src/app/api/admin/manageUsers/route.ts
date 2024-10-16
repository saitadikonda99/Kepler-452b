import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";

const handler = async (req: NextRequest) => {
  const connection = await pool.getConnection();

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

    const [users] = await connection.query(`
        SELECT u.id, u.username, u.name, u.email, u.role, u.active,
          CASE 
              WHEN u.role = 'club_lead' THEN c.club_name
              ELSE 'N/A'
          END AS club_name
          FROM users u
          LEFT JOIN clubs c ON u.id = c.lead_id
    `);

    const usersData = users as any[];

    connection.release();

    return NextResponse.json(usersData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};

export const GET = withMiddleware(handler);
