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

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason }, { status: 403 });
    }

    const {
      leadUsername,
      clubName,
      leadName,
      leadEmail,
      leadPassword,
      leadConfirmPassword,
    } = await req.json();

    if (leadPassword !== leadConfirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    if (!leadUsername || !clubName || !leadName || !leadEmail || !leadPassword || !leadConfirmPassword) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const userCheck: any = await connection.query(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [leadUsername, leadEmail]
    );

    if (userCheck[0].length > 0) {
      return NextResponse.json({ message: "User or Email already exists" }, { status: 409 });
    }

    await connection.beginTransaction();
  
    const [result]: any = await pool.query(
      `
        INSERT INTO users (username, name, password, email, role, RefreshToken)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [leadUsername, leadName, leadPassword, leadEmail, "club_lead", null]
    );

    const [getLeadUser]: any = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [leadEmail]
    );

    const leadId = getLeadUser[0].id;

    const [club]: any = await connection.query(
      `
        UPDATE clubs SET lead_id = ? WHERE club_name = ?
      `,
      [leadId, clubName]
    );

    const MY_KEY = "getClubDetails";

    redisClient.del(MY_KEY);

    await connection.commit();
    
    return NextResponse.json({ message: "Lead data updated successfully" }, { status: 200 });
  } catch (error) {
    await connection.rollback();
    console.error("Error in clubUpdate/lead:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    connection.release();
  }
};
