import { pool } from "../../../../../config/db";
import { redisClient } from "../../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";

const MY_KEY = "NewsLandscape";

export const POST = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason}, { status: 403 });
    }

    const { newsId, newsLink, clubName, newsContent } = await req.json();

    if (!newsLink || !clubName || !newsContent || !newsId) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    await pool.query('START TRANSACTION');

    await pool.query(
      `UPDATE news_landscape 
       SET news_link = ?, club_name = ?, news_content = ?
       WHERE id = ?`,
      [newsLink, clubName, newsContent, newsId]
    );

    await pool.query('COMMIT');
    await redisClient.del(MY_KEY);

    return NextResponse.json({ message: "News updated successfully"}, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in POST /api/admin/news/landscape:", error);
    return NextResponse.json({ message: "Internal server error"}, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
  
    const [news] = await pool.query(
      `SELECT * FROM news_landscape ORDER BY upload_at DESC LIMIT 2;`
    );

    await redisClient.setEx(MY_KEY, 3600, JSON.stringify(news));

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/admin/news/landscape:", error);
    return NextResponse.json({ message: "Internal server error"}, { status: 500 });
  }
};
