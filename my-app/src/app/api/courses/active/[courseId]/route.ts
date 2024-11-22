import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";
import { redisClient } from "../../../../../config/redis";

const postHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized"}, {status: 401});
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason}, {status: 403});
  }

  try {
    
    const courseId = req.nextUrl.pathname.split("/").pop();

    const { active } = await req.json();

    if (courseId == null || active == null) {
      return NextResponse.json({ message: "Club ID and active status are required" }, { status: 400 });
    }

    await pool.query('START TRANSACTION');

    await pool.query(
      `UPDATE courses SET is_active = ? WHERE id = ?`,
      [active, courseId]   
    );

    await pool.query('COMMIT');

    const message = active === 1 ? "Course activated successfully" : "Course deactivated successfully";
    return NextResponse.json({message}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  } 
};

export const POST = withMiddleware(postHandler);