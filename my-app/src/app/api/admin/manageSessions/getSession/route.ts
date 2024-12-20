import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";

const getHandler = async (req: NextRequest) => {
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
    const [result]: any = await pool.query(
      `SELECT 
        s.*,
        c.club_name,
        u.name as lead_name,
        ud.id_number as lead_username
      FROM sessions s
      JOIN clubs c ON s.session_club_id = c.id
      JOIN users u ON c.lead_id = u.id
      JOIN user_details ud ON u.id = ud.user_id
      WHERE c.id = ? AND s.is_active = 1
      ORDER BY s.session_date DESC`,
    );

    console.log(result);

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const GET = withMiddleware(getHandler); 