import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { clubName, clubLogo, clubDes, clubId } = await req.json();

    if (!clubName || !clubLogo || !clubDes || !clubId) {
      return NextResponse.json({
        message:
          "All fields (clubName, clubLogo, clubDes, clubId) are required",
        status: 400,
      });
    }

    const [result] = await pool.query(
        `
            UPDATE club_data
            SET club_name = ?, club_description = ?, club_logo = ?
            WHERE club_id = ?
            `,
      [clubName, clubDes, clubLogo, clubId]
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};
