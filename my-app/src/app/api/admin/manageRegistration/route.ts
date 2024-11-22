import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { redisClient } from "../../../../config/redis";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";

const KEY = "registration_status";

const PostHandler = async (req: NextRequest) => {
    try {

      const { valid, payload } = await verifyJWT();

      if (!valid || !payload) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const { authorized, reason: roleReason } = verifyRoles(
        { ...payload, role: payload.role || "User" },
        "Admin"
      );
  
      if (!authorized) {
        return NextResponse.json({ message: roleReason }, { status: 403 });
      }
  
        
        const academicYearId = await req.json();

        console.log(academicYearId);
        

        const [result] = await pool.query(`
            INSERT INTO registration_status (academic_year_id, status)
            VALUES (?, 1)
        `, [academicYearId]);

        await redisClient.del(KEY);

        return NextResponse.json({ message: "Registration opened successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};

const GetHandler = async (req: NextRequest) => {
  try {
  
    const cache = await redisClient.get(KEY);

    if (cache) {
      return NextResponse.json(JSON.parse(cache), { status: 200 });
    }

    const [result] = await pool.query(`
        SELECT 
            rs.id,
            rs.academic_year_id,
            ay.year_range,
            ay.semester,
            rs.status AS registration_status
        FROM 
            registration_status rs
        JOIN 
            academic_years ay ON rs.academic_year_id = ay.id;
    `);

    await redisClient.setEx(KEY, 86400, JSON.stringify(result));

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Error in GET /api/admin/manageUsers:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = withMiddleware(GetHandler);
export const POST = withMiddleware(PostHandler);
