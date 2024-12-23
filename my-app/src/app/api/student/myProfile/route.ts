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

    const [result]: any = await pool.query(
        `
        SELECT 
            u.id AS user_id,
            u.username,
            u.name AS user_name,
            u.email AS user_email,
            u.role,
            u.active AS user_active,
            ud.name AS user_detail_name,
            ud.id_number,
            ud.branch,
            ud.email_id AS user_detail_email,
            ud.gender,
            ud.country_code,
            ud.phone_number,
            ud.residency,
            ud.hostel_name,
            ud.bus_route,
            ud.country,
            ud.state,
            ud.district,
            ud.pincode,
            ud.club_id,
            ud.domain AS user_detail_domain,
            ud.erp_reference_number,
            ud.payment_status,
            ud.registration_date AS user_detail_registration_date,
            c.club_name,
            c.club_domain,
            c.club_description,
            c.club_about,
            c.club_logo,
            c.active AS club_active,
            c.upload_at AS club_upload_at
        FROM users u
        LEFT JOIN user_details ud ON u.id = ud.user_id
        LEFT JOIN clubs c ON ud.club_id = c.id
        WHERE u.id = ?`,
        [studentId]
    );
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};