import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {

    const { leadUsername, clubId, leadName, leadEmail, clubName, clubLogo, clubDes } = await req.json();

    // Validation to check for missing fields

    console.log(leadUsername, clubId, leadName, leadEmail, clubName, clubLogo, clubDes);

    if (!leadUsername || !clubId || !leadName || !leadEmail || !clubName || !clubLogo || !clubDes) {
      return NextResponse.json({
        message: "All fields (clubName, clubLogo, clubDes, clubId) are required",
        status: 400,
      });
    }

    // Start a transaction
    await pool.beginTransaction;

    const [userResult] = await pool.query(
      `
        UPDATE users
        SET name = ?, email = ?
        WHERE username = ?
      `,
      [leadName, leadEmail, leadUsername] // Updating name and email of the lead by username
    );

    const [clubResult] = await pool.query(
      `
        UPDATE club
        SET club_name = ?, lead_id = (SELECT id FROM users WHERE username = ?)
        WHERE id = ?
      `,
      [clubName, leadUsername, clubId] 
    );

    const [clubDataResult] = await pool.query(
      `
        UPDATE club_data
        SET club_name = ?, club_lead_id = (SELECT id FROM users WHERE username = ?), club_description = ?, club_logo = ?
        WHERE club_id = ?
      `,
      [clubName, leadUsername, clubDes, clubLogo, clubId] 
    );

    await pool.commit;

    return NextResponse.json({ status: 200, message: "Lead, club, and club data updated successfully" });
  } catch (error) {
    await pool.rollback;
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
