import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";
import { redisClient } from "../../../../../config/redis";

const deleteHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  const KEY = `getCourses`;

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized"}, {status: 401});
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {  
    return NextResponse.json({ message: roleReason}, {status: 403});
  }

  try {
    
    const pattern = 'getCourses*'; 

    const cachedData = await redisClient.keys(pattern);
    if (cachedData) {
      await redisClient.del(cachedData);
    }

    const courseId = req.nextUrl.pathname.split("/").pop();

    const [result]: any = await pool.query(
      `DELETE FROM courses WHERE id = ?`,
      [courseId]
    );

    await redisClient.del(KEY);
    
    return NextResponse.json({message: "Course deleted successfully"}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  } 
};

export const DELETE = withMiddleware(deleteHandler);