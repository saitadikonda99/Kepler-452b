import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { withMiddleware } from "../../../../../middleware/middleware";
import { redisClient } from "../../../../../config/redis";
import { verifyJWT } from "../../../../../lib/verifyJWT";

const getHandler = async (req: NextRequest, { params }: { params: { clubName: string } }) => {

  const { valid, payload } = await verifyJWT();


  const { clubName } = params;

  try {
    const [courses]: any = await pool.query(
        `SELECT c.id, c.course_name, c.course_code, c.course_slots, c.course_handout, c.course_level
         FROM courses c
         JOIN clubs cl ON c.club_id = cl.id
         WHERE cl.club_name = ?
           AND (c.course_slots - c.register_students) > 0`,
        [clubName]
    );


    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export const GET = withMiddleware(getHandler); 