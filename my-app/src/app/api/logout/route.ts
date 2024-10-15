import { cookies } from "next/headers";
import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const connection = await pool.getConnection();

  try {
    const cookieStore = cookies();
    const JWT = cookieStore.get("jwt")?.value;

    console.log(JWT);
    if (!JWT) {
      return NextResponse.json(
        { valid: false, reason: "JWT missing" },
        { status: 400 }
      );
    }

    await connection.query(
      `
            UPDATE users
            SET RefreshToken = null
            WHERE RefreshToken = ?`,
      [JWT]
    );

    cookieStore.set("jwt", "", { maxAge: 0 });

    connection.release();

    return NextResponse.json({ message: "Logged out", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error logging out", status: 500 });
  }
};
