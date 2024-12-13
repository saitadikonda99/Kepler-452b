import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";

const handler = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason }, { status: 403 });
    }

    const [users] = await pool.query(`
      SELECT 
        u.id AS user_id,
        u.name AS user_name,
        u.email,
        ud.id_number,
        ud.branch,
        ud.email_id AS contact_email,
        ud.gender,
        ud.residency,
        ud.hostel_name,
        ud.bus_route,
        ud.country,
        ud.state,
        ud.district,
        ud.pincode,
        ud.phone_number,
        ud.payment_status,
        ud.erp_reference_number,
        ud.domain,
        ud.registration_date,
        c.club_name AS club_name,
        GROUP_CONCAT(DISTINCT co.course_code) as course_codes,
        GROUP_CONCAT(DISTINCT co.course_name) as course_names,
        GROUP_CONCAT(DISTINCT ay.year_range) as academic_years,
        GROUP_CONCAT(DISTINCT ay.semester) as semesters
      FROM 
        users u
      LEFT JOIN 
        user_details ud ON u.id = ud.user_id
      LEFT JOIN
        clubs c ON ud.club_id = c.id
      LEFT JOIN
        course_registrations cr ON u.id = cr.user_id
      LEFT JOIN
        courses co ON cr.course_id = co.id
      LEFT JOIN
        academic_years ay ON cr.academic_year_id = ay.id
      WHERE
        u.role = 'student'
      GROUP BY
        u.id
      ORDER BY 
        ud.registration_date DESC
    `);

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = withMiddleware(handler); 