import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware"


const getHandler = async (req: NextRequest) => {


  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles({ ...userData, role: userData.role || 'User' }, 'Admin');

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }

  try {

    const MY_KEY = "getClubDetails"

    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }

    const [result]: any = await pool.query( 
        `SELECT 
            u.id AS user_id,
            u.username,
            u.name AS user_name,
            u.email,
            u.role,
            c.id AS club_id,
            c.club_name,
            c.club_domain,
            c.club_description,
            c.club_about,
            c.club_logo,
            c.upload_at,
            c.active
        FROM 
            clubs c
        LEFT JOIN 
            users u ON u.id = c.lead_id`
    );

    redisClient.setEx(MY_KEY, 3600, JSON.stringify(result));

    return NextResponse.json(result, { status: 200 });
        
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error, status: 500 });
  }
};


export const GET = withMiddleware(getHandler);