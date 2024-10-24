import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";
import { redisClient } from "../../../../config/redis";

const postHandler = async (req: NextRequest) => {
  const connection = await pool.getConnection();

  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }

  try {
    const { clubId, glimpseImage, glimpseDesc } = await req.json();

    if (!clubId || !glimpseImage || !glimpseDesc) {
      return NextResponse.json({ status: 401 });
    }

    const [result]: any = await connection.query(
      `Insert INTO glimpse (club_id, glimpse_image, glimpse_desc) VALUES (?, ?, ?)`,
      [clubId, glimpseImage, glimpseDesc]
    );

    const MY_KEY = `glimpse_${clubId}`;
    redisClient.del(MY_KEY);

    connection.release();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};

const getHandler = async (req: NextRequest) => {
  const connection = await pool.getConnection();

  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }

  try {
    let leadId: number;
    let clubData: any;
    let clubId: number;

    
    if (!userData.role.includes("Admin")) {
      leadId = userData.id;
      clubData = await connection.query(
        `SELECT id FROM clubs WHERE lead_id = ?`,
        [leadId]
      );
      clubId = clubData[0][0].id;
    } else {
      const body = await req.json();
      clubId = body.clubId;
    }
    
    const MY_KEY = `glimpse_${clubId}`;

    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }
    
    const [result]: any = await connection.query(
      `SELECT * FROM glimpse WHERE club_id = ? ORDER BY upload_at DESC LIMIT 2`,
      [clubId]
    );

    redisClient.setEx(MY_KEY, 3600, JSON.stringify(result));

    const MY_KEY_CLUB = `clubData${clubId}`;
    redisClient.del(MY_KEY_CLUB);

    connection.release();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const GET = withMiddleware(getHandler);
export const POST = withMiddleware(postHandler);
