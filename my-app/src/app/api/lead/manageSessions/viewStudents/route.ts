import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";
import * as XLSX from 'xlsx';

const handler = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "club_lead"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason }, { status: 403 });
    }

    // get the club id from the payload
    const userData: any = payload;
    const leadId = userData.id;

    const [clubData] = await pool.query(
      `SELECT id FROM clubs WHERE lead_id = ?`,
      [leadId]
    );

    const clubId = clubData[0].id;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '15', 10);
    const branch = searchParams.get('branch') || null;
    const year = searchParams.get('year') || null;
    const courseId = searchParams.get('courseId') || null;
    const download = searchParams.get('download') === 'true';
    const offset = (page - 1) * pageSize;

    let query = `
      SELECT 
        u.id AS user_id,
        u.name AS user_name,
        ud.id_number,
        ud.payment_status,
        ud.branch,
        ud.residency,
        ud.hostel_name,
        ud.bus_route,
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
        (u.role = 'student' OR u.role = 'club_lead')
        AND ud.club_id = ?
    `;

    const queryParams = [clubId];

    if (branch) {
      query += ' AND ud.branch = ?';
      queryParams.push(branch);
    }

    if (year) {
      query += ' AND SUBSTRING(ud.id_number, 1, 2) = ?';
      queryParams.push(year.slice(-2));
    }

    if (courseId) {
      query += ' AND cr.course_id = ?';
      queryParams.push(courseId);
    }

    // Remove pagination for download
    if (!download) {
      query += ' LIMIT ? OFFSET ?';
      queryParams.push(pageSize, offset);
    }

    const [users] = await pool.query(query, queryParams) as [any[], any];

    const usersWithFormattedYear = users.map(user => ({
      ...user,
      year: user.year ? `20${user.year}` : 'N/A'
    }));

    if (download) {
      // Format data for Excel
      const excelData = usersWithFormattedYear.map(user => ({
        'ID Number': user.id_number || 'N/A',
        'Name': user.user_name || 'N/A',
        'Year': user.year || 'N/A',
        'Branch': user.branch || 'N/A',
        'Club': user.club_name || 'N/A',
        'Course': user.course_name || 'N/A',
        'Course Code': user.course_code || 'N/A',
        'Payment Status': user.payment_status || 'Unpaid',
        'residency': user.residency || 'N/A',
        'hostel_name': user.hostel_name || 'N/A',
        'bus_route': user.bus_route || 'N/A'
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Students');

      // Generate buffer
      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

      // Return Excel file
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename="students.xlsx"'
        }
      });
    }

    const countQuery = `
      SELECT COUNT(*) AS total 
      FROM users u 
      LEFT JOIN user_details ud ON u.id = ud.user_id 
      LEFT JOIN course_registrations cr ON u.id = cr.user_id
      WHERE (u.role = 'student' OR u.role = 'club_lead')
      ${clubId ? 'AND ud.club_id = ?' : ''}
      ${branch ? 'AND ud.branch = ?' : ''}
      ${year ? 'AND SUBSTRING(ud.id_number, 1, 2) = ?' : ''}
      ${courseId ? 'AND cr.course_id = ?' : ''}
    `;
    
    const countParams = [];
    if (clubId) countParams.push(clubId);
    if (branch) countParams.push(branch);
    if (year) countParams.push(year.slice(-2));
    if (courseId) countParams.push(courseId);
    
    const [countResult] = await pool.query(countQuery, countParams);
    const totalCount = countResult[0].total;

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