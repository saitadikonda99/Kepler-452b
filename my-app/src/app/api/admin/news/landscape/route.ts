import { pool } from "../../../../../config/db";
import { redisClient } from "../../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";

const MY_KEY = "NewsLandscape";

export const POST = async (req: any) => {
  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  if (!payload) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const { authorized, reason: roleReason } = verifyRoles(
    { ...payload, role: payload.role || "User" },
    "Admin"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }

  try {
    const { newsId, newsLink, clubName, newsContent } = await req.json();

    console.log(newsLink, clubName, newsContent, newsId);

    if (!newsLink || !clubName || !newsContent || !newsId) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    const response = await pool.query(
      `
        INSERT INTO news_landscape (news_link, club_name, news_content)
        VALUES (?, ?, ?)
      `,
      [newsLink, clubName, newsContent, newsId]
    );
  
    redisClient.del(MY_KEY);

    return NextResponse.json({ message: "News created", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }

    const response = await pool.query(
      `SELECT * FROM news_landscape ORDER BY upload_at DESC LIMIT 2;`
    );

    const News_landscape = response[0];

    redisClient.setEx(MY_KEY, 3600, JSON.stringify(News_landscape));

    return NextResponse.json(News_landscape, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};
