import { pool } from "../../../../config/db";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    
    const { valid, payload } = await verifyJWT();

    if (!valid) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }
    
    const userData: any = payload;

    const studentId = userData.id;

    const [club_id]: any = await pool.query(
      `SELECT club_id FROM user_details WHERE user_id = ?`,
      [studentId]
    );

    const clubId = club_id[0]?.club_id;

    const [result]: any = await pool.query(
        `SELECT c.club_name, c.club_description, c.club_logo, c.club_domain, 
         u.username as lead_username, u.name as lead_name
         FROM clubs c
         LEFT JOIN users u ON c.lead_id = u.id
         WHERE c.id = ?`,
        [clubId]
    );
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};