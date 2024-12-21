import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";

const postHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userData: any = payload;
  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason }, { status: 403 });
  }

  try {
    const { sessionId, isActive } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
    }

    await pool.query('START TRANSACTION');

    // Update session status
    await pool.query(
      `UPDATE sessions SET is_active = ? WHERE id = ?`,
      [isActive, sessionId]
    );

    await pool.query('COMMIT');

    return NextResponse.json({ message: "Session status updated successfully" }, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const POST = withMiddleware(postHandler);
