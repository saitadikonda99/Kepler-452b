import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";

const getHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized"}, {status: 401});
  }

  const userData: any = payload;
  const { searchParams } = new URL(req.url);
  const academicYearId = searchParams.get('academicYearId');
  const courseId = searchParams.get('courseId');

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason}, {status: 403});
  }

  try {
    const [clubId]: any = await pool.query(
      `SELECT id FROM clubs WHERE lead_id = ?`,
      [userData.id]
    );
    
    let query = `
      SELECT 
        s.*,
        c.course_name,
        c.course_code,
        cl.club_name,
        u.name as resource_person_name,
        u.username as resource_person_username,
        GROUP_CONCAT(DISTINCT si.user_id) as inCharges,
        GROUP_CONCAT(DISTINCT CONCAT(iu.name, '|', iu.username)) as incharge_details
      FROM sessions s
      LEFT JOIN courses c ON s.session_course_id = c.id
      LEFT JOIN clubs cl ON s.session_club_id = cl.id
      LEFT JOIN users u ON s.session_resource_person = u.id
      LEFT JOIN session_inCharges si ON s.id = si.session_id
      LEFT JOIN users iu ON si.user_id = iu.id
      WHERE s.session_club_id = ?
    `;
    let params = [clubId[0].id];

    if (academicYearId) {
      query += ` AND s.academic_year_id = ?`;
      params.push(academicYearId);
    }

    if (courseId) {
      query += ` AND s.session_course_id = ?`;
      params.push(courseId);
    }

    query += ` GROUP BY s.id ORDER BY s.session_date DESC, s.session_sTime DESC`;

    const [result]: any = await pool.query(query, params);

    // Process the result to include incharge details
    const processedResult = result.map(session => {
      const inchargeDetails = session.incharge_details ? 
        session.incharge_details.split(',').map(detail => {
          const [name, username] = detail.split('|');
          return { name, username };
        }) : [];

      const inCharges = session.inCharges ? 
        session.inCharges.split(',').map((id: string, index: number) => ({
          user_id: id,
          name: inchargeDetails[index]?.name || '',
          username: inchargeDetails[index]?.username || ''
        })) : [];

      return {
        ...session,
        inCharges
      };
    });

    return NextResponse.json(processedResult, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  }
};

export const GET = withMiddleware(getHandler);