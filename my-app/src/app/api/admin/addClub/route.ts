import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    const KEY = "getClubs";

    if (!valid) {
      return NextResponse.json({ message: "Unauthorized"}, {status: 401});
    }

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized"}, {status: 401});
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason}, {status: 403});
    }

    const {
      leadUsername,
      leadEmail,
      clubDomain,
      clubName,
    } = await req.json();

    if (
      !leadUsername ||
      !leadEmail ||
      !clubDomain ||
      !clubName
    ) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 401 }
      );
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

    if (userCheck[0].role === "club_lead") {
      return NextResponse.json(
        { message: "User is already a club lead" },
        { status: 409 }
      );
    }

    if (userCheck[0].role === "Admin") {
      return NextResponse.json({ message: "User is already an admin" }, { status: 409 });
    }

    const [clubCheck]: any = await pool.query(
      `SELECT * FROM clubs WHERE club_name = ?`,
      [clubName]
    );

    if (clubCheck.length > 0) {
      return NextResponse.json(
        { message: "Club already exists" },
        { status: 409 }
      );
    }

    await pool.query('START TRANSACTION');

    console.log(clubDomain)

    // update user role to club_lead
    await pool.query(
      `UPDATE users SET role = 'club_lead' WHERE username = ?`,
      [leadUsername]
    );

    const [getLeadUser]: any = await pool.query(
      `SELECT id FROM users WHERE username = ?`,
      [leadUsername]
    );

    const leadId = getLeadUser[0].id; 

    const [club]: any = await pool.query(
      `
      INSERT INTO clubs (club_name, lead_id, club_domain, club_description, club_about, club_logo)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        clubName,
        leadId,
        clubDomain,
        "please update the description of your club",
        "please update the About description of your club",
        "logo",
      ]
    );
    
    // Get the last inserted club ID
    const clubId = (club as any).insertId;

    // Call the stored procedure to insert additional data
    await pool.query("CALL AddClubData(?);", [clubId]);

    await pool.query('COMMIT');

    await redisClient.del(KEY);
    
    return NextResponse.json({ message: "Club added successfully" }, { status: 200 });

  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in addClub:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
