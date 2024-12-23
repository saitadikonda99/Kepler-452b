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

    const [result]: any = await pool.query(
      `SELECT 
        s.id AS session_id,
        s.academic_year_id,
        s.session_name,
        s.session_type,
        s.session_date,
        s.session_sTime,
        s.session_eTime,
        s.session_venue,
        s.session_course_id,
        s.session_club_id,
        s.session_lead_id,
        s.session_points,
        s.session_neg_points,
        s.session_resource_person,
        sa.attendance_status,
        sa.attendance_points,
        sa.resource_person_points,
        sa.inCharge_points,
        sa.extra_points,
        sic.user_id AS inCharge_user_id
    FROM 
        sessions s
    LEFT JOIN 
        session_inCharges sic ON s.id = sic.session_id
    LEFT JOIN 
        session_attendance sa ON s.id = sa.session_id AND sa.user_id = ?
    WHERE 
        (sic.user_id = ? OR sa.user_id = ?)
    ORDER BY 
        s.session_date DESC;
`,
      [studentId, studentId, studentId]
    );


    
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};