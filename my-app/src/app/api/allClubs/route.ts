import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const [clubDetails] = await pool.query(`
      SELECT 
          c.id AS id,
          c.club_id AS club_id,
          c.club_name,
          u.username AS lead_username,
          u.name AS lead_name,
          u.email AS lead_email,
          cd.club_description,
          cd.club_domain,
          cd.club_logo
      FROM 
          clubs c
      JOIN 
          users u ON c.lead_id = u.id
      JOIN 
          club_data cd ON c.id = cd.club_id;
      `);

    const club = clubDetails as any[];

    return NextResponse.json(club, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};