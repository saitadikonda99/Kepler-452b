import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

export const POST = async (req: NextRequest) => {

  try {

    const { valid, payload } = await verifyJWT();

    if (!valid) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles({ ...payload, role: payload.role || 'User' }, 'Admin');

    if (!authorized) {
      return NextResponse.json({ message: roleReason, status: 403 });
    }

    const { leadUsername, leadPassword, leadConfirmPassword, leadName, leadEmail, clubId, clubDomain, clubName, clubLogo, clubDes } = await req.json();



    if (leadPassword !== leadConfirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 } 
      );
    }

    if (!leadUsername || !leadPassword || !leadConfirmPassword || !leadName || !leadEmail || !clubId || !clubDomain || !clubName || !clubLogo || !clubDes) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 401 } 
      );
    }

    
    const userCheck :any = await pool.query(
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
      `SELECT * FROM clubs WHERE club_id = ? OR club_name = ?`,
      [clubId, clubName]
    );
    
    if (clubCheck[0].length > 0) {
      return NextResponse.json(
        { message: "Club already exists" },
        { status: 409 } 
      );
    }

    pool.beginTransaction;

    const [result]: any = await pool.query(
      `
        INSERT INTO users (username, name, password, email, role, RefreshToken)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
      [leadUsername, leadName, leadPassword, leadEmail, "club_lead", null]
    );

    const leadId = (result as any).insertId;

    console.log(leadId);

    const [club]: any = await pool.query(
      `
      INSERT INTO clubs (club_id, club_name, lead_id)
      VALUES (?, ?, ?)
      `,
      [clubId, clubName, leadId]
    );

    const club_id = (club as any).insertId;

    await pool.query(
      `
      INSERT INTO club_data (club_id, club_domain, club_description, club_logo)
      VALUES (?, ?, ?, ?)
      `,
      [club_id, clubDomain, clubDes, clubLogo]
    );

    pool.commit;

    return NextResponse.json({ message: "Club added successfully", status: 200 });

  } catch (error) {
    pool.rollback;

    return NextResponse.json({ message: error.message || "Server error", status: 500 });
  }
};
