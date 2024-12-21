import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { withMiddleware } from "../../../../../middleware/middleware";

const handler = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    
    if (!valid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const searchQuery = req.nextUrl.searchParams.get('query');

    if (!searchQuery) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }

    const clubId = req.nextUrl.pathname.split('/').pop();

    console.log("Club ID:", clubId);

    if (!clubId) {
      return NextResponse.json({ message: "Club ID is required" }, { status: 400 });
    }

    // Search for users who are registered for this club's courses
    const [users]: any = await pool.query(
      `SELECT DISTINCT 
        u.id, 
        u.username, 
        u.name,
        u.role
      FROM users u
      INNER JOIN course_registrations cr ON u.id = cr.user_id
      INNER JOIN courses c ON cr.course_id = c.id
      WHERE c.club_id = ?
      AND (u.username LIKE ? OR u.name LIKE ?)
      AND (u.role = 'student' OR u.role = 'club_lead')
      AND u.active = 1
      LIMIT 5`,
      [clubId, `%${searchQuery}%`, `%${searchQuery}%`]
    );

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error in user search:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const GET = withMiddleware(handler); 