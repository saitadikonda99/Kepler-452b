"use server";

import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const isAuth = async (username: string, password: string) => {
  try {
    const user = await pool.query(
      `
            SELECT * FROM users
            WHERE username = ? 
            AND password = ?
            `,
      [username, password]
    );

    return user[0];
  } catch (error) {
    return error;
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { username, password } = await req.json();
    console.log(username, password);

    const user = await isAuth(username, password);

    const Authenticated = user as any[];

    if (Authenticated.length === 0) {
      // send status 401 if user is not found
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const roles = await pool.query(
      `SELECT role
             FROM users
             WHERE username = ?`,
      [Authenticated[0].username]
    );

    const role = roles[0] as any[];

    // create a JWT token

    const accessToken = jwt.sign(
      {
        username: Authenticated[0].username,
        role: [role[0].role],
        id: Authenticated[0].id,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "30sec", algorithm: "HS256" }
    );

    const refreshToken = jwt.sign(
      {
        username: Authenticated[0].username,
        role: [role[0].role],
        id: Authenticated[0].id,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "15m", algorithm: "HS256" }
    );

    // save the refresh token into the database of the users table

    await pool.query(
      `UPDATE users
            SET RefreshToken = ?
            WHERE username = ?`,
      [refreshToken, Authenticated[0].username]
    );

    // set the cookie max time to 10 seconds
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 15 * 60 * 1000);

    // set the cookie with refresh token
    cookies().set("jwt", refreshToken, {
      sameSite: "lax",
      secure: false,
      httpOnly: false,
      expires: expirationTime,
    });

    return NextResponse.json({
      message: "Authenticated",
      id: Authenticated[0].id,
      username: Authenticated[0].username,
      role: role[0].role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};