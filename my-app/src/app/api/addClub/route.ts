import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { leadUsername, leadName, leadEmail, clubName, clubLogo, clubDes } =
      await req.json();

    if (!clubName || !clubLogo || !clubDes || !leadName) {
      return NextResponse.json(
        {
          message:
            "All fields (clubName, clubLogo, clubDes, leadName, leadEmail) are required",
        },
        { status: 400 }
      );
    }

    console.log("sai");

    await pool.beginTransaction;

    const [userData] = await pool.query(
      `
        INSERT INTO users (username, name, password, email, role, RefreshToken)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
      [leadUsername, leadName, "1234", leadEmail, "club_lead", null]
    );

    const leadId = (userData as any).insertId;

    const [clubResult] = await pool.query(
      `
      INSERT INTO club (club_name, lead_id)
      VALUES (?, ?)
      `,
      [clubName, leadId]
    );

    const clubId = (clubResult as any).insertId;

    await pool.query(
      `
      INSERT INTO club_data (club_id, club_name, club_lead_id, club_description, club_logo)
      VALUES (?, ?, ?, ?, ?)
      `,
      [clubId, clubName, leadId, clubDes, clubLogo]
    );

    await pool.commit;

    return NextResponse.json({ status: 200 });
  } catch (error) {

    return NextResponse.json({ message: error, status: 500 });
  }
};
