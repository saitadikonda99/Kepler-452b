import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../lib/verifyJWT";

export const GET = async (req: NextRequest) => {
  try {
    // check the club id from user id

    const { valid, payload } = await verifyJWT();

    const userId = payload.id;

    const clubIdRes = await pool.query(
      `SELECT id
            FROM club
            WHERE lead_id = ?`,
      [userId]
    );

    const clubId = clubIdRes[0] as any[];

    console.log(clubId[0].id);

    // get the club details

    const clubDetails = await pool.query(
       `SELECT * FROM club_data 
            WHERE club_id = ?
            ORDER BY uploadAt DESC LIMIT 1`,
        [clubId[0].id]
    );

    const club = clubDetails[0] as any[];

    console.log(club);

    return NextResponse.json(club, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};
