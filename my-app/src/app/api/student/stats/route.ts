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
        `
        SELECT club_name as value, 'club_name' as type FROM clubs WHERE id = ?
        UNION ALL
        SELECT COUNT(DISTINCT session_id) as value, 'sessions_attended' as type FROM session_attendance WHERE attendance_status = 'Present' AND user_id = ?
        UNION ALL
        SELECT COUNT(DISTINCT session_name) as value, 'sessions_conducted' as type FROM sessions WHERE session_resource_person = ?
        `, [clubId, studentId, studentId]
    );

    
      
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};