import { pool } from "../../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../../middleware/middleware";

const getHandler = async (req: NextRequest, { params }: { params: { academicYearId: string } }) => {
  try {
    const { valid, payload } = await verifyJWT();
    
    if (!valid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason }, { status: 403 });
    }

    const academicYearId = params.academicYearId;
    const clubId = req.nextUrl.searchParams.get('clubId');

    let query = `
      SELECT 
        courses.id AS course_id,
        courses.course_code,
        courses.course_name,
        courses.course_handout,
        courses.course_level,
        courses.register_students,
        courses.course_slots,
        courses.is_active AS course_active,
        courses.club_id,
        clubs.club_name,
        clubs.club_domain,
        clubs.club_description,
        clubs.active AS club_active
      FROM 
        courses
      INNER JOIN 
        clubs ON courses.club_id = clubs.id
      WHERE 
        courses.academic_year_id = ?
        AND courses.is_active = 1
        AND clubs.active = 1
    `;

    const queryParams = [academicYearId];

    if (clubId) {
      query += ' AND courses.club_id = ?';
      queryParams.push(clubId);
    }

    query += ' ORDER BY courses.course_code ASC';

    const [result]: any = await pool.query(query, queryParams);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in clubCourses:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const GET = withMiddleware(getHandler); 