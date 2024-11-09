import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../lib/verifyJWT";
import { verifyRoles } from "../../../lib/verifyRoles";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { password, confirmPassword } = await req.json();

    if (!password || !confirmPassword) {
      return NextResponse.json({
        message: "All fields (password, confirmPassword) are required"
      }, { status: 400 });
    }

    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized"}, {status: 401});
    }

    const userData: any = payload;
    const { authorized, reason: roleReason } = verifyRoles(
      { ...userData, role: userData.role || 'User' }, 
      'Admin', 
      'club_lead'
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason }, { status: 403 });
    }

    if (!password || !confirmPassword) {
      return NextResponse.json({
        message: "All fields are required"
      }, { status: 400 });
    }

    await pool.query('START TRANSACTION');

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, userData.id]  
    );

    await pool.query('COMMIT');
    
    return NextResponse.json({ message: "Password updated successfully"}, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  }
};
