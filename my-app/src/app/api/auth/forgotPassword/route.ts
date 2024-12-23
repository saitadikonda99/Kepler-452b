"use server";

import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import fs from 'fs';
import path from 'path';

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    console.log(email)

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const [user]: any = await pool.query(
      `SELECT username, name, role, active, id, password
       FROM users 
       WHERE email = ?
       LIMIT 1`,
      [email]
    );

    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // create a token
    const resetToken = jwt.sign(
        {
          username: user[0].username,
          name: user[0].name,
          role: user[0].role,
          id: user[0].id,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "10m", algorithm: "HS256" }
    );

    // Read the HTML template
    const templatePath = path.join(process.cwd(), 'src/app/api/auth/forgotPassword/forgot.html');
    let emailTemplate = fs.readFileSync(templatePath, 'utf8');
    
    // Replace the reset link placeholder
    const resetLink = `${process.env.CLIENT_URL}/auth/resetPassword/${resetToken}`;
    emailTemplate = emailTemplate.replace('{{resetLink}}', resetLink);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: emailTemplate
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } 
};
