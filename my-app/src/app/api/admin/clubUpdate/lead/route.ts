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
      leadEmail,
      clubId,
    } = await req.json();

  
    if (!leadUsername || !clubName || !leadEmail || !clubId) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (!leadEmail.startsWith(leadUsername)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const [userCheck]: any = await pool.query(
      `SELECT * FROM users WHERE username = ?`,
      [leadUsername]
    );

    if (userCheck.length === 0) {
      return NextResponse.json({ message: "user must be registered" }, { status: 404 });
    }

    console.log(userCheck[0].role);

    if (userCheck.length > 0 && userCheck[0].role === "club_lead") {
      return NextResponse.json({ message: "User is already a club lead" }, { status: 409 });
    }

    if (userCheck.length > 0 && userCheck[0].role === "Admin") {
      return NextResponse.json({ message: "User is already an admin" }, { status: 409 });
    }


    await pool.query('START TRANSACTION');

    const [oldLead]: any = await pool.query(
      `SELECT lead_id FROM clubs WHERE club_name = ?`,
      [clubName]
    );

    if (oldLead.length > 0) {
      await pool.query(
        `UPDATE users SET role = 'student' WHERE id = ?`,
        [oldLead[0].lead_id]
      );
    }

    const [updatedUser]: any = await pool.query(
      `UPDATE users SET role = 'club_lead' WHERE username = ?`,
      [leadUsername]
    );


    const [getLeadUser]: any = await pool.query(
      `SELECT id FROM users WHERE username = ?`,
      [leadUsername]
    );

    const leadId = getLeadUser[0].id;

    await pool.query(
      `UPDATE clubs SET lead_id = ? WHERE club_name = ?`,
      [leadId, clubName]
    );

    await pool.query('COMMIT');
    
    return NextResponse.json({ message: "Lead data updated successfully" }, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in clubUpdate/lead:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
