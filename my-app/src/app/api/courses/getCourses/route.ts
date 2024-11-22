import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";
import { redisClient } from "../../../../config/redis";

const getHandler = async (req: NextRequest) => {
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
    
    const userId = userData.id;

    // get club id with user id

    const [clubId]: any = await pool.query(
        `SELECT id FROM clubs WHERE lead_id = ?`,
        [userId]
    );

    const clubIdValue = clubId[0].id;

    const [result]: any = await pool.query(
        `SELECT * FROM courses WHERE club_id = ?`,
        [clubIdValue]
    );

    console.log(result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  } 
};

export const GET = withMiddleware(getHandler);