import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";

const handlePost = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    
    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized"}, {status: 401});
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason}, {status: 403});
    }

    const { userId, active } = await req.json();

    if (userId == null || active == null) {
      return NextResponse.json({ message: "Invalid input"}, {status: 400});
    }

    await pool.query('START TRANSACTION');

    await pool.query(
      `UPDATE users SET active = ? WHERE id = ?`,
      [active, userId]
    );

    await pool.query('COMMIT');

    return NextResponse.json({ message: "User status updated"}, {status: 200});
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in POST /api/admin/manageUsers/active:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};

export const POST = withMiddleware(handlePost);
