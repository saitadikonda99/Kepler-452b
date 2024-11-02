import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";
import { redisClient } from "../../../../config/redis";

const postHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason }, { status: 403 });
  }

  try {
    const { clubId, glimpseId, glimpseImage, glimpseDesc } = await req.json();

    if (!clubId || !glimpseImage || !glimpseDesc) {
      return NextResponse.json( { message: "All fields are required"}, { status: 401 });
    }

    const [result]: any = await pool.query(
      `UPDATE glimpse 
       SET club_id = ?, glimpse_image = ?, glimpse_desc = ? 
       WHERE id = ?`,
      [clubId, glimpseImage, glimpseDesc, glimpseId]
    );

    return NextResponse.json({message: "Glimpse updated successfully"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

const getHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason }, { status: 403 });
  }

  try {
    let leadId: number;
    let clubData: any;
    let clubId: number;

    if (!userData.role.includes("Admin")) {
      leadId = userData.id;
      clubData = await pool.query(`SELECT id FROM clubs WHERE lead_id = ?`, [
        leadId,
      ]);
      clubId = clubData[0][0].id;
    } else {
      const body = await req.json();
      clubId = body.clubId;
    }

    const [result]: any = await pool.query(
      `SELECT * FROM glimpse WHERE club_id = ? ORDER BY upload_at DESC LIMIT 2`,
      [clubId]
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const GET = withMiddleware(getHandler);
export const POST = withMiddleware(postHandler);
