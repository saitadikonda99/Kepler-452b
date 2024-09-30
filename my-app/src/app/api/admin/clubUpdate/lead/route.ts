import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {


    const { leadUsername, clubName, leadName, leadEmail, leadPassword, leadConfirmPassword} = await req.json();

    console.log(leadUsername, clubName, leadName, leadEmail, leadPassword, leadConfirmPassword);

    if (leadPassword !== leadConfirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 } 
      );
    }

    if (!leadUsername || !clubName || !leadName || !leadEmail || !leadPassword || !leadConfirmPassword) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 } 
      );
    }

    const userCheck :any = await pool.query(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [leadUsername, leadEmail]
    );

    if (userCheck[0].length > 0) {
      return NextResponse.json(
        { message: "User or Email already exists" },
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

    const [getLeadUser]: any = await pool.query(
        `SELECT id FROM users WHERE email = ?`,
        [leadEmail]
      );
    
    const leadId = getLeadUser[0].id;
  
    const [club]: any = await pool.query(
      `
        UPDATE clubs SET lead_id = ? WHERE club_name = ?
      `,
      [leadId, clubName]
    );

    pool.commit;
    
    return NextResponse.json({ status: 200, message: "Lead, club, and club data updated successfully" });
  } catch (error) {
    await pool.rollback;
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
