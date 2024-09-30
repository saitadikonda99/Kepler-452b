import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {

    const { id, clubId, clubDomain, clubName, clubLogo, clubDes } = await req.json();


    console.log(id, clubId, clubDomain, clubName, clubLogo, clubDes);

    // Validation to check for missing fields
    if (!clubId || !clubDomain || !clubName || !clubLogo || !clubDes) {
      return NextResponse.json({
        message: "All fields (clubName, clubLogo, clubDes, clubId) are required",
        status: 400,
      });
    }

    // Start a transaction
    pool.beginTransaction;

    // first update the club_id and club_name
    const clubUpdate: any = await pool.query(
      `UPDATE clubs SET club_id = ?, club_name = ? WHERE id = ?`,
      [clubId, clubName, id]
    );

    // then update the club_data
    const clubDataUpdate: any = await pool.query(
      `UPDATE club_data SET club_domain = ?, club_logo = ?, club_description = ? WHERE club_id = ?`,
      [clubDomain, clubLogo, clubDes, id]
    );
  
    pool.commit;

    return NextResponse.json({ status: 200, message: "Lead, club, and club data updated successfully" });
  } catch (error) {
    pool.rollback;
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
