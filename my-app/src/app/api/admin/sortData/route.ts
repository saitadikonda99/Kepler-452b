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
    const pageSize = parseInt(searchParams.get('pageSize') || '15', 10);
    const clubId = searchParams.get('clubId') || null;
    const branch = searchParams.get('branch') || null;
    const year = searchParams.get('year') || null;
    const offset = (page - 1) * pageSize;

    let query = `
      SELECT 
        u.id AS user_id,
        u.name AS user_name,
        ud.id_number,
        ud.payment_status,
        ud.branch,
        SUBSTRING(ud.id_number, 1, 2) AS year,
        c.club_name,
        co.course_name,
        co.course_code
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
      WHERE
        u.role = 'student'
    `;

    const queryParams = [];

    if (clubId) {
      query += ' AND ud.club_id = ?';
      queryParams.push(clubId);
    }

    if (branch) {
      query += ' AND ud.branch = ?';
      queryParams.push(branch);
    }

    if (year) {
      query += ' AND SUBSTRING(ud.id_number, 1, 2) = ?';
      queryParams.push(year.slice(-2));
    }

    query += ' LIMIT ? OFFSET ?';
    queryParams.push(pageSize, offset);

    const [users] = await pool.query(query, queryParams) as [any[], any];

    const countQuery = `
      SELECT COUNT(*) AS total 
      FROM users u 
      LEFT JOIN user_details ud ON u.id = ud.user_id 
      WHERE u.role = 'student'
      ${clubId ? 'AND ud.club_id = ?' : ''}
      ${branch ? 'AND ud.branch = ?' : ''}
      ${year ? 'AND SUBSTRING(ud.id_number, 1, 2) = ?' : ''}
    `;
    
    const countParams = [];
    if (clubId) countParams.push(clubId);
    if (branch) countParams.push(branch);
    if (year) countParams.push(year.slice(-2));
    
    const [countResult] = await pool.query(countQuery, countParams);
    const totalCount = countResult[0].total;

    const usersWithFormattedYear = users.map(user => ({
      ...user,
      year: user.year ? `20${user.year}` : 'N/A'
    }));

    return NextResponse.json({ users: usersWithFormattedYear, totalCount }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = withMiddleware(handler);