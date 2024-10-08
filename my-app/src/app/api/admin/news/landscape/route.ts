import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";

export const POST = async (req: any) => {


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


    console.log(newsLink, clubName, newsContent, newsId);

    if (!newsLink || !clubName || !newsContent || !newsId) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }


    const response = await pool.query(
      `
          UPDATE news_landscape 
          SET news_link = ?, club_name = ?, news_content = ? 
          WHERE id = ?
      `,
      [newsLink, clubName, newsContent, newsId]
  );
  

    const News_landscape = response[0];

    if (!News_landscape) {
      return NextResponse.json({ message: "News not created", status: 500 });
    }

    return NextResponse.json({ message: "News created", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const response = await pool.query(
      `
            SELECT * FROM news_landscape ORDER BY upload_at DESC LIMIT 2;
            `
    );

    const News_landscape = response[0];

    console.log(News_landscape);

    if (!News_landscape) {
      return NextResponse.json({ message: "No news found", status: 404 });
    }

    return NextResponse.json(News_landscape, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};
