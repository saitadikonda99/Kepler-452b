import { cookies } from "next/headers";
import { pool } from "../../../config/db"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const connection = await pool.getConnection();

  try {
    const cookieStore = cookies();
    const JWT = cookieStore.get("jwt")?.value;

    console.log(JWT);
    if (!JWT) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    await connection.query(
      `UPDATE users SET RefreshToken = null WHERE RefreshToken = ?`,
      [JWT]
    );

    cookieStore.set("jwt", "", { maxAge: 0 });

    connection.release();

    return NextResponse.redirect(new URL('/auth/login', req.url));
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  } finally {
    connection.release();
  }
};