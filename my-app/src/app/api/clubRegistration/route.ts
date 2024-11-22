import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { redisClient } from "../../../config/redis";
import { emailQueue } from "./emailQueue";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const KEY = `getCourses`;


    const formData = await req.formData();

    const name = formData.get("name") as string;
    const idNumber = formData.get("idNumber") as string;
    const email = formData.get("email") as string;
    const branch = formData.get("branch") as string;
    const gender = formData.get("gender") as string;
    const year = formData.get("year") as string;
    const countryCode = formData.get("countryCode") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const residency = formData.get("residency") as string;
    const hostelName = formData.get("hostelName") as string;
    const busRoute = formData.get("busRoute") as string;
    const country = formData.get("country") as string;
    const state = formData.get("state") as string;
    const district = formData.get("district") as string;
    const pinCode = formData.get("pinCode") as string;
    const domain = formData.get("domain") as string;
    const clubName = formData.get("clubName") as string;
    const clubId = formData.get("clubId") as string;
    const courseId = formData.get("courseId") as string;
    const academicYearId = formData.get("academicYearId") as string;
    const courseName = formData.get("courseName") as string;
    const idCard = formData.get("idCard") as File;
    const erpPayment = formData.get("erpPayment") as File;

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

    if (idCard.size > maxSizeInBytes || erpPayment.size > maxSizeInBytes) {
      return NextResponse.json({ message: 'File size exceeds the limit of 2MB' }, { status: 400 });
    }

    // Validation

    if (!name) {
      return NextResponse.json({ message: "Name is required." }, { status: 400 });
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      return NextResponse.json(
        { message: "Name should contain only letters and spaces." },
        { status: 400 }
      );
    }

    if (!idNumber) {
      return NextResponse.json({ message: "Id number is required." }, { status: 400 });
    }

    if (!/^\d{10}$/.test(idNumber)) {
      return NextResponse.json(
        { message: "Id number should be a 10-digit number." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    if (!email || !/^[A-Za-z0-9._%+-]+@kluniversity\.in$/.test(email)) {
      return NextResponse.json(
        { message: "Provide a valid KL University email address." },
        { status: 400 }
      );
    }

    if (!branch) {
      return NextResponse.json({ message: "Branch is required." }, { status: 400 });
    }

    if (!gender) {
      return NextResponse.json({ message: "Gender is required." }, { status: 400 });
    }

    if (!year) {
      return NextResponse.json({ message: "Year is required." }, { status: 400 });
    }

    if (!residency) {
      return NextResponse.json({ message: "Residency is required." }, { status: 400 });
    }

    if (residency === "Hosteler" && !hostelName) {
      return NextResponse.json(
        { message: "Hostel name is required for hosteler." },
        { status: 400 }
      );
    }

    if (residency === "Day Scholar" && !busRoute) {
      return NextResponse.json(
        { message: "Bus route is required for day scholar." },
        { status: 400 }
      );
    }

    if (country === "India" && (!state || !district || !pinCode)) {
      return NextResponse.json(
        { message: "State, district, and pinCode are required for India." },
        { status: 400 }
      );
    }

    if (!domain || !clubName) {
      return NextResponse.json(
        { message: "Domain and club name are required." },
        { status: 400 }
      );
    }

    if (!courseId || !courseName) {
      return NextResponse.json(
        { message: "Course selection is required." },
        { status: 400 }
      );
    }

    if (!idCard.name.endsWith('.pdf') || !erpPayment.name.endsWith('.pdf')) {
      return NextResponse.json(
        { message: "File type should be pdf." },
        { status: 400 }
      );
    }

    if (!idCard || !erpPayment || !(idCard instanceof File) || !(erpPayment instanceof File)) {
      return NextResponse.json(
        { message: "Both ID Card and ERP Payment files are required." },
        { status: 400 }
      );
    }

    // Save files to disk to home directory

    const idCardDir = path.resolve(process.cwd(), "idCards");
    const erpPaymentDir = path.resolve(process.cwd(), "erpPayments");

    try {
      await fs.mkdir(idCardDir, { recursive: true });
      await fs.mkdir(erpPaymentDir, { recursive: true });
    } catch (mkdirError) {
      console.error("Error creating directories:", mkdirError);
      return NextResponse.json(
        { message: "Server error" },
        { status: 500 }
      );
    }

    const idCardFileName = `${idNumber}_idcard.pdf`;
    const erpPaymentFileName = `${idNumber}_erpPayment.pdf`;

    const idCardPath = path.join(idCardDir, idCardFileName);
    const erpPaymentPath = path.join(erpPaymentDir, erpPaymentFileName);

    try {
      const idCardBuffer = new Uint8Array(await idCard.arrayBuffer());
      const erpPaymentBuffer = new Uint8Array(await erpPayment.arrayBuffer());
      await fs.writeFile(idCardPath, idCardBuffer);
      await fs.writeFile(erpPaymentPath, erpPaymentBuffer);
    } catch (writeError) {
      console.error("Error saving files:", writeError);
      return NextResponse.json(
        { message: "Server error: Unable to save files." },
        { status: 500 }
      );
    }

    // Insert into database
    const query = `
        INSERT INTO user_details (
            user_id, name, id_number, email_id, branch, gender, country_code, phone_number,
            residency, hostel_name, bus_route, country, state, district,
            pincode, club_id, domain
        ) 
        VALUES (
            ?, ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?
        );
    `;

    const values = [
      name,
      idNumber,
      email,
      branch,
      gender,
      countryCode,
      phoneNumber,
      residency,
      hostelName,
      busRoute,
      country,
      state,
      district,
      pinCode,
      clubId,
      domain,
    ];


    const [userCheck]: any = await pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
  
    if (userCheck.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    await pool.query('START TRANSACTION');

    // password is idNumber + last 4 digits of phoneNumber
    const password = idNumber + phoneNumber.slice(-4);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result]: any = await pool.query(
      `INSERT INTO users (username, name, password, email, role, RefreshToken)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [idNumber, name, hashedPassword, email, "student", null]
    )

    console.log(result);

    const userId = result.insertId;
    
    await pool.query(query, [userId, ...values]);

    // insert into course_registrations

    const [academicYear]: any = await pool.query(
      `INSERT INTO course_registrations (user_id, course_id, academic_year_id) VALUES (?, ?, ?);`,
      [userId, courseId, academicYearId]
    );

    await pool.query(
      `UPDATE courses SET register_students = register_students + 1 WHERE id = ? AND course_slots > register_students;`,
      [courseId]
    );


    await redisClient.del(KEY);

    await pool.query('COMMIT');

    // Send confirmation email
    const emailJob = {
      email: email,
      subject: `Message from student club registration`,
      text: `Hello ${name},\n\nYou have successfully registered for ${clubName} club. Please wait for the club lead to approve your registration.`,
    };

    await emailQueue.add(emailJob);

    return NextResponse.json(
      {
        message: "Registration successful. Confirmation email sent.",
      },
      { status: 200 }
    );

  } catch (error) {
    await pool.query('ROLLBACK');
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
