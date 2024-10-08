import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

export const POST = async (req: NextRequest) => {

    const connection = await pool.getConnection();

  try {
    const { valid, payload } = await verifyJWT();

    if (!valid) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason, status: 403 });
    }

    const {
      leadUsername,
      leadPassword,
      leadConfirmPassword,
      leadName,
      leadEmail,
      clubDomain,
      clubName,
    } = await req.json();

    if (leadPassword !== leadConfirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (
      !leadUsername ||
      !leadPassword ||
      !leadConfirmPassword ||
      !leadName ||
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

    const userCheck: any = await pool.query(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [leadUsername, leadEmail]
    );

    if (userCheck[0].length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const clubCheck: any = await pool.query(
      `SELECT * FROM clubs WHERE club_name = ?`,
      [clubName]
    );

    if (clubCheck[0].length > 0) {
      return NextResponse.json(
        { message: "Club already exists" },
        { status: 409 }
      );
    }

    await connection.beginTransaction();

    const [result]: any = await pool.query(
      `
      INSERT INTO users (username, name, password, email, role, RefreshToken)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [leadUsername, leadName, leadPassword, leadEmail, "club_lead", null]
    );

    // Get the last inserted lead ID
    const leadId = (result as any).insertId;

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
    await pool.query('CALL AddClubData(?);', [clubId]);


    await connection.commit();

    return NextResponse.json({
      message: "Club added successfully",
      status: 200,
    });

  } catch (error) {
    await connection.rollback();

    console.log(error)

    return NextResponse.json({
      message: error.message || "Server error",
      status: 500,
    });
  }
};
