import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";
import { redisClient } from "../../../../config/redis";

const postHandler = async (req: NextRequest) => {
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
    
    const {id, academicYear, courseName, courseCode, courseLevel, courseSlots, courseHandout } = await req.json();

    console.log(id, academicYear, courseName, courseCode, courseLevel, courseSlots, courseHandout);

    if ( !id || !academicYear || !courseName || !courseCode || !courseLevel || !courseSlots || !courseHandout) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }



    if (isNaN(courseSlots)) {
        return NextResponse.json({ message: "Course slots should be a number" }, { status: 400 });
    }

    const [result]: any = await pool.query(
        `UPDATE courses SET academic_year_id = ?, course_name = ?, course_code = ?, course_level = ?, course_slots = ?, course_handout = ? WHERE id = ?`,
        [academicYear, courseName, courseCode, courseLevel, courseSlots, courseHandout, id]
    );
    
    await redisClient.del(KEY);
    return NextResponse.json({message: "Course updated successfully"}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  } 
};

export const POST = withMiddleware(postHandler);