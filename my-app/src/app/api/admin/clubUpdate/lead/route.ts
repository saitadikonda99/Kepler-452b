import { pool } from "../../../../../config/db";
import { redisClient } from "../../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
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

    const userCheck: any = await pool.query(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [leadUsername, leadEmail]
    );

    if (userCheck[0].length > 0) {
      return NextResponse.json({ message: "User or Email already exists" }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(leadPassword, salt);

    await pool.query('START TRANSACTION');
  
    const [result]: any = await pool.query(
      `INSERT INTO users (username, name, password, email, role, RefreshToken)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [leadUsername, leadName, hashedPassword, leadEmail, "club_lead", null]
    );

    const [getLeadUser]: any = await pool.query(
      `SELECT id FROM users WHERE email = ?`,
      [leadEmail]
    );

    const leadId = getLeadUser[0].id;

    await pool.query(
      `UPDATE clubs SET lead_id = ? WHERE club_name = ?`,
      [leadId, clubName]
    );

    const MY_KEY = "getClubDetails";
    redisClient.del(MY_KEY);

    await pool.query('COMMIT');
    
    return NextResponse.json({ message: "Lead data updated successfully" }, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in clubUpdate/lead:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
