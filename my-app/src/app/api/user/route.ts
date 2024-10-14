import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../lib/verifyJWT";
import { verifyRoles } from "../../../lib/verifyRoles";

export const GET = async (req: NextRequest) => {
  try {

    const { valid, payload } = await verifyJWT();

    if (!valid) {
        return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const userData: any = payload;

    const { authorized, reason: roleReason } = verifyRoles({ ...userData, role: userData.role || 'User' }, 'Admin', 'club_lead');

    if (!authorized) {
        return NextResponse.json({ message: roleReason, status: 403 });
    }

    const userId = userData.id;

    const [result] = await pool.query(
      `
        SELECT username, name FROM users
        WHERE id = ?
      `,
      [userId]  
    );

    const MY_KEY = 'user'

    redisClient.setEx(MY_KEY, 3600, JSON.stringify(result));
    
    return NextResponse.json(result, { status: 200});
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
