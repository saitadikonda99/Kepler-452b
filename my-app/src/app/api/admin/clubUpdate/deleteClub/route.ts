import { pool } from "../../../../../config/db";
import { redisClient } from "../../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";

export const POST = async (req: NextRequest) => {
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

    const { clubId, active } = await req.json();

    if (clubId == null || active == null) {
      return NextResponse.json({ message: "Club ID and active status are required" }, { status: 400 });
    }

    await connection.beginTransaction();

    await connection.query(
      `UPDATE clubs SET active = ? WHERE id = ?`,
      [active, clubId]   
    );

    await connection.commit();

    const MY_KEY = "getClubs";
    await redisClient.del(MY_KEY);

    const message = active === 1 ? "Club activated successfully" : "Club deactivated successfully";
    return NextResponse.json({ message }, { status: 200 });

  } catch (error) {
    await connection.rollback();
    console.error("Error in deleteClub:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    connection.release();
  }
};
