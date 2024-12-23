import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { password, confirmPassword } = await req.json();

    if (!password || !confirmPassword) {
      return NextResponse.json({
        message: "All fields (password, confirmPassword) are required"
      }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({
        message: "Passwords do not match"
      }, { status: 400 });
    }

    const token = req.nextUrl.pathname.split("/").pop();

    if (!token) {
      return NextResponse.json({ 
        message: "Reset token is required"
      }, { status: 400 });
    }

    let payload;
    try {
      const { payload: tokenPayload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET),
        {
          algorithms: ['HS256'],
        }
      );
      payload = tokenPayload;
    } catch (error) {
      if (error.code === 'ERR_JWT_EXPIRED') {
        return NextResponse.json({ 
          message: "Password reset link has expired. Please request a new one."
        }, { status: 401 });
      }
      return NextResponse.json({ 
        message: "Invalid reset token. Please request a new password reset."
      }, { status: 401 });
    }

    if (!payload || !payload.id) {
      return NextResponse.json({ 
        message: "Invalid token payload"
      }, { status: 400 });
    }

    await pool.query('START TRANSACTION');

    // Verify user exists
    const [user] = await pool.query(
      'SELECT id FROM users WHERE id = ?',
      [payload.id]
    );

    if (!Array.isArray(user) || user.length === 0) {
      await pool.query('ROLLBACK');
      return NextResponse.json({ 
        message: "User not found"
      }, { status: 404 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, payload.id]  
    );

    await pool.query('COMMIT');
    
    return NextResponse.json({ 
      message: "Password updated successfully"
    }, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Password reset error:', error);
    return NextResponse.json({ 
      message: "An error occurred while resetting your password"
    }, { status: 500 });
  }
};
