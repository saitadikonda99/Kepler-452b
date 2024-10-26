import { pool } from "../../../../../config/db";
import { redisClient } from "../../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";

const handleDelete = async (req: NextRequest) => {
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

    const userId = req.nextUrl.pathname.split("/").pop();

    await pool.query('START TRANSACTION');

    await pool.query(`DELETE FROM users WHERE id = ?`, [userId]);

    const MY_KEY = "manageUsers";
    await redisClient.del(MY_KEY);

    await pool.query('COMMIT');

    return NextResponse.json({ message: "User deleted", status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in deleteUser:", error);
    return NextResponse.json({ message: "Server error", status: 500 });
  }
};

export const DELETE = withMiddleware(handleDelete);
