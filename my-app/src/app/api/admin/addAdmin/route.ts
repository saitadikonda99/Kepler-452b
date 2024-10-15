import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

export const POST = async (req: NextRequest) => {

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

    
    const { adminUsername, adminPassword, adminConfirmPassword, adminName, adminEmail } = await req.json();


    if (adminPassword !== adminConfirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 } 
      );
    }

    if (!adminUsername || !adminPassword || !adminConfirmPassword || !adminName || !adminEmail) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 401 } 
      );
    }

    const userCheck :any = await connection.query(
        `SELECT * FROM users WHERE username = ? OR email = ?`,
        [adminUsername, adminEmail]
        );


    if (userCheck[0].length > 0) {
        return NextResponse.json(
            { message: "User already exists" },
            { status: 409 }
            );
    }

    connection.beginTransaction;

    const [result]: any = await connection.query(
        `
        INSERT INTO users (username, name, password, email, role, RefreshToken)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [adminUsername, adminName, adminPassword, adminEmail, "admin", null]
        );

    connection.commit;
    connection.release();
    
    return NextResponse.json({ message: "Club added successfully", status: 200 });

  } catch (error) {
    connection.rollback;

    return NextResponse.json({ message: error.message || "Server error", status: 500 });
  }
};
