import { pool } from "../../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../../middleware/middleware";
import fs from "fs";
import csv from "csv-parser";


const handler = async (req: NextRequest) => {
  try {
    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized"}, {status: 401});
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason}, {status: 403});
    }
    
    const clubId = req.nextUrl.pathname.split("/").pop();
    const csvData = await req.json();

    const rows = csvData.split("\n");
    const headers = rows[0].split(",");
    const dataRows = rows.slice(1);

    const studentData = dataRows.map((row) => {
      const values = row.split(",");
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() || null; 
        return obj;
      }, {});
    });

    await pool.query('START TRANSACTION');

    // Create bulk insert query
    const insertValues = studentData.map(student => {
      const { student_id, student_name, batch, department, gender, residence } = student;
      return `('${student_id}', '${student_name}', '${batch}', '${department}', '${gender}', '${residence}', '${clubId}')`;
    }).join(', ');

    const bulkInsertQuery = `
      INSERT INTO student_registration (student_id, student_name, batch, department, gender, residence, club_id)
      VALUES ${insertValues}
      ON DUPLICATE KEY UPDATE registration_date = CURRENT_TIMESTAMP
    `;

    await pool.query(bulkInsertQuery);
    await pool.query('COMMIT');


    return NextResponse.json({ message: "User status updated"}, {status: 200});
    
  } catch (error) {
    console.log(error)
    await pool.query('ROLLBACK');
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
}

export const POST = withMiddleware(handler);
