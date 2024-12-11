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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const offset = (page - 1) * pageSize;

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
            ud.country,
            ud.phone_number,
            ud.payment_status,
            ud.erp_reference_number,
            ud.domain,
            ud.registration_date,
            c.club_name AS club_name
        FROM 
            users u
        LEFT JOIN 
            user_details ud
        ON 
            u.id = ud.user_id
        LEFT JOIN
            clubs c
        ON
            ud.club_id = c.id
        WHERE
            u.role = 'student'
      LIMIT ? OFFSET ?
    `, [pageSize, offset]);

    const [countResult] = await pool.query(`SELECT COUNT(*) AS total FROM users WHERE role = ?`, ['student']);
    const totalCount = countResult[0].total;

    return NextResponse.json({ users, totalCount }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = withMiddleware(handler);
