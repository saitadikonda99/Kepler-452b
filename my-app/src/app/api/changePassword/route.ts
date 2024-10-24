import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../lib/verifyJWT";
import { verifyRoles } from "../../../lib/verifyRoles";
import { connect } from "http2";

export const POST = async (req: NextRequest) => {

const connection = await pool.getConnection();

  try {

    const { password, confirmPassword } = await req.json();


    const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles({ ...userData, role: userData.role || 'User' }, 'Admin', 'club_lead');

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }

    if (!password || !confirmPassword) {
      return NextResponse.json({
        message: "All fields (password, confirmPassword) are required",
        status: 400,
      });
    }


    const [userResult] = await connection.query(
      `
        UPDATE users
        SET password = ?
        WHERE id = ?
      `,
      [password, userData.id]  
    );

    connection.release();
    
    return NextResponse.json({ status: 200, message: "Lead, club, and club data updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  } finally {
    connection.release();
  }
};
