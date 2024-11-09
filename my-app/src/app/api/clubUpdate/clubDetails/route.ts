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

    const { clubId, clubLogo, clubName, clubDesc, clubAbout } = await req.json();


    if (!clubLogo || !clubName || !clubDesc || !clubAbout) {
      return NextResponse.json({ message: "All fields are required"}, { status: 401 });
    }

    if (clubAbout.split(" ").length < 10 || clubAbout.split(" ").length > 15) {
      return NextResponse.json({ message: "About club should be 20 to 25 words"}, { status: 401 });
    }

    if (clubDesc.split(" ").length < 10 || clubDesc.split(" ").length > 25) {
      return NextResponse.json({ message: "Description should be 20 to 25 words"}, { status: 401 });
    }

    const [result]: any = await pool.query(
        `UPDATE clubs 
         SET club_logo = ?, club_name = ?, club_desc = ?, club_about = ? 
         WHERE id = ?`,   
        [clubLogo, clubName, clubDesc, clubAbout, clubId]
    );
     

    return NextResponse.json({ message: "Club details updated successfully"}, { status: 200 });
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
      `SELECT * FROM clubs WHERE id = ?`,
      [clubId]
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  } 
};

export const GET = withMiddleware(getHandler);
export const POST = withMiddleware(postHandler);