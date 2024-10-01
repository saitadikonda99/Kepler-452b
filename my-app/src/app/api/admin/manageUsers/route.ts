import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware"

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
    
    const [users] = await pool.query(`
        SELECT * FROM users;
    `);
    
    const usersData = users as any[];

    return NextResponse.json(usersData, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};


export const GET = withMiddleware(handler);