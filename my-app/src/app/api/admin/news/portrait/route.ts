import { pool } from "../../../../../config/db";
import { redisClient } from "../../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";

const MY_KEY = "NewsPortrait";

export const POST = async (req: any) => {
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

    if (!newsLink || !clubName || !newsContent) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    await pool.query('START TRANSACTION');

    await pool.query(
      `UPDATE news_portrait
       SET news_link = ?, club_name = ?, news_content = ?
       WHERE id = ?`,
      [newsLink, clubName, newsContent, newsId]
    );

    await pool.query('COMMIT');
    await redisClient.del(MY_KEY);

    return NextResponse.json({ message: "News created"}, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in POST /api/admin/news/portrait:", error);
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {


    const [news] = await pool.query(
      `SELECT * FROM news_portrait ORDER BY upload_at DESC LIMIT 4;`
    );


    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/admin/news/portrait:", error);
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  }
};
