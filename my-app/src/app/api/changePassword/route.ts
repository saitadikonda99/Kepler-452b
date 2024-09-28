import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../lib/verifyJWT";

export const POST = async (req: NextRequest) => {
  try {

    const { password, confirmPassword } = await req.json();

    const {valid, payload} = await verifyJWT();

    if (!valid) {
      return NextResponse.json({ message: "Invalid token", status: 401 });
    }

    if (!password || !confirmPassword) {
      return NextResponse.json({
        message: "All fields (password, confirmPassword) are required",
        status: 400,
      });
    }

    // Start a transaction
    await pool.beginTransaction;

    const [userResult] = await pool.query(
      `
        UPDATE users
        SET password = ?
        WHERE username = ?
      `,
      [password, payload.username] // Updating password of the user by username
    );
    await pool.commit;

    return NextResponse.json({ status: 200, message: "Lead, club, and club data updated successfully" });
  } catch (error) {
    await pool.rollback;
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
