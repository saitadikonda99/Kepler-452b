import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";
import { redisClient } from "../../../../config/redis";

const postHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();

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
    const { clubId, socialName, socialLink } = await req.json();

    if (!clubId || !socialName || !socialLink) {
      return NextResponse.json( { message: "All fields are required"}, { status: 401 });
    }

    const [result]: any = await pool.query(
      `INSERT INTO socials (club_id, social_name, social_link) VALUES (?, ?, ?)`,
      [clubId, socialName, socialLink]
    );

    const MY_KEY = `club_socials_${clubId}`;
    redisClient.del(MY_KEY);

    const MY_KEY_CLUB = `clubData${clubId}`;
    redisClient.del(MY_KEY_CLUB);

    return NextResponse.json({message: "Socials updated successfully"},{ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  } 
};

const getHandler = async (req: NextRequest) => {

  const { valid, payload } = await verifyJWT();

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
    let leadId: number;
    let clubData: any;
    let clubId: number;

    if (!userData.role.includes("Admin")) {
      leadId = userData.id;
      clubData = await pool.query(
        `SELECT id FROM clubs WHERE lead_id = ?`,
        [leadId]
      );
      clubId = clubData[0][0].id;
    } else {
      const body = await req.json();
      clubId = body.clubId;
    }

    const [result]: any = await pool.query(
      `
            SELECT s1.*
                FROM socials s1
                JOIN (
                    SELECT club_id, social_name, MAX(upload_at) AS min_upload_at
                    FROM socials
                    GROUP BY club_id, social_name
                ) s2
                ON s1.club_id = s2.club_id
                AND s1.social_name = s2.social_name
                AND s1.upload_at = s2.min_upload_at
                WHERE s1.club_id = ?
            `,
      [clubId]
    );


    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  } 
};

export const GET = withMiddleware(getHandler);
export const POST = withMiddleware(postHandler);