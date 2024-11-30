import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { redisClient } from "../../../config/redis";
import { emailQueue } from "./emailQueue";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";

const validateName = (name: string) => {
  if (!name) {
    return { error: "Name is required." };
  }
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return { error: "Name should contain only letters and spaces." };
  }
  return { error: null };
};

const validateIdNumber = (idNumber: string) => {
  if (!idNumber) {
    return { error: "Id number is required." };
  }
  if (!/^\d{10}$/.test(idNumber)) {
    return { error: "Id number should be a 10-digit number." };
  }
  return { error: null };
};

const validateEmail = (email: string) => {
  if (!email) {
    return { error: "Email is required." };
  }
  if (!/^[A-Za-z0-9._%+-]+@kluniversity\.in$/.test(email)) {
    return { error: "Provide a valid KL University email address." };
  }
  return { error: null };
};

const validateBranch = (branch: string) => {
  if (!branch) {
    return { error: "Branch is required." };
  }
  return { error: null };
};

const validateGender = (gender: string) => {
  if (!gender) {
    return { error: "Gender is required." };
  }
  return { error: null };
};

const validateYear = (year: string) => {
  if (!year) {
    return { error: "Year is required." };
  }
  return { error: null };
};

const validateResidency = (residency: string, hostelName: string, busRoute: string) => {
  if (!residency) {
    return { error: "Residency is required." };
  }
  if (residency === "Hosteler" && !hostelName) {
    return { error: "Hostel name is required for hosteler." };
  }
  if (residency === "Day Scholar" && !busRoute) {
    return { error: "Bus route is required for day scholar." };
  }
  return { error: null };
};

const validateAddress = (country: string, state: string, district: string, pinCode: string) => {
  if (country === "India" && (!state || !district || !pinCode)) {
    return { error: "State, district, and pinCode are required for India." };
  }
  return { error: null };
};

const validateDomainAndClub = (domain: string, clubName: string) => {
  if (!domain || !clubName) {
    return { error: "Domain and club name are required." };
  }
  return { error: null };
};

const validateCourse = (courseId: string, courseName: string) => {
  if (!courseId || !courseName) {
    return { error: "Course selection is required." };
  }
  return { error: null };
};

const validateIdCard = (idCard: File) => {
  if (!idCard || !(idCard instanceof File)) {
    return { error: "ID Card is required." };
  }
  if (!idCard.name.endsWith('.pdf')) {
    return { error: "File type should be pdf." };
  }
  return { error: null };
};

const validateErpReferenceNumber = (erpReferenceNumber: string) => {
  if (!erpReferenceNumber) {
    return { error: "Erp Payment reference number is required" };
  }
  return { error: null };
};

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
    const erpReferenceNumber = formData.get("erpReferenceNumber") as string;

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

    if (idCard.size > maxSizeInBytes) {
      return NextResponse.json({ message: 'File size exceeds the limit of 2MB' }, { status: 400 });
    }

    // Validation
    const validationResults = [
      validateName(name),
      validateIdNumber(idNumber),
      validateEmail(email),
      validateBranch(branch),
      validateGender(gender),
      validateYear(year),
      validateResidency(residency, hostelName, busRoute),
      validateAddress(country, state, district, pinCode),
      validateDomainAndClub(domain, clubName),
      validateCourse(courseId, courseName),
      validateIdCard(idCard),
      validateErpReferenceNumber(erpReferenceNumber),
    ];

    const errors = validationResults.filter(result => result.error !== null);

    if (errors.length > 0) {
      return NextResponse.json({ message: errors[0].error }, { status: 400 });
    }

    // Save files to disk to home directory
    const idCardDir = path.resolve(process.cwd(), "idCards");

    try {
      await fs.mkdir(idCardDir, { recursive: true });
    } catch (mkdirError) {
      console.error("Error creating directories:", mkdirError);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }

    const idCardFileName = `${idNumber}_idcard.pdf`;
    const idCardPath = path.join(idCardDir, idCardFileName);

    try {
      const idCardBuffer = new Uint8Array(await idCard.arrayBuffer());
      await fs.writeFile(idCardPath, idCardBuffer);
    } catch (writeError) {
      console.error("Error saving files:", writeError);
      return NextResponse.json({ message: "Server error: Unable to save files." }, { status: 500 });
    }

    // Insert into database
    const query = `
      INSERT INTO user_details (
        user_id, name, id_number, email_id, branch, gender, country_code, phone_number,
        residency, hostel_name, bus_route, country, state, district,
        pincode, club_id, domain, erp_reference_number
      ) 
      VALUES (
        ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?
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
      erpReferenceNumber
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
    );

    console.log(result);

    const userId = result.insertId;
    
    await pool.query(query, [userId, ...values]);

    // insert into course_registrations
    await pool.query(
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
