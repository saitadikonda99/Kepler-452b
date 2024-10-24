import { pool } from "../../../../../config/db";
import { redisClient } from "../../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";

const MY_KEY = "NewsPortrait";

export const POST = async (req: any) => {

  const connection = await pool.getConnection();



  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  if (!payload) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const { authorized, reason: roleReason } = verifyRoles({ ...payload, role: payload.role || 'User' }, 'Admin');

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }


  try {
    const { newsId, newsLink, clubName, newsContent } = await req.json();

    if (!newsLink || !clubName || !newsContent) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    console.log(newsLink, clubName, newsContent, newsId);

    const response = await connection.query(
      `
        INSERT INTO news_portrait (news_link, club_name, news_content)
        VALUES (?, ?, ?)
      `,
      [newsLink, clubName, newsContent]
  );
  

  redisClient.del(MY_KEY);

  connection.release();

    return NextResponse.json({ message: "News created", status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  } finally {
    connection.release();
  }
};

export const GET = async (req: NextRequest) => {

  const connection = await pool.getConnection();

  try {

    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }

    const response = await connection.query(
      `
            SELECT * FROM news_portrait ORDER BY upload_at DESC LIMIT 4;
            `
    );

    const News_portrait = response[0];

    connection.release();

    redisClient.setEx(MY_KEY, 3600, JSON.stringify(News_portrait))

    return NextResponse.json(News_portrait, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  } finally {
    connection.release();
  }
};
