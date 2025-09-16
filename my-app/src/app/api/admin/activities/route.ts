import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { parse } from "csv-parse/sync";
import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

interface ActivityData {
  ClubName: string;
  clubDomain: "TEC" | "LCH" | "ESO" | "HWB" | "IIE";
  ActivityName: string;
  ActivityDate: string;
  ActivityVenue: string;
  ActivityType: string;
  ActivityReportLink?: string;
  ActivityParticipants: number;
}

export async function POST(request: NextRequest) {
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

    const contentType = request.headers.get("content-type");
    
    if (contentType?.includes("application/json")) {
      const activityData = await request.json();
      
      const requiredFields = [
        "ClubName",
        "clubDomain", 
        "ActivityName",
        "ActivityDate",
        "ActivityVenue",
        "ActivityType",
        "ActivityParticipants"
      ];
      
      const missingFields = requiredFields.filter(field => !activityData[field]);
      if (missingFields.length > 0) {
        return NextResponse.json(
          { success: false, message: `Missing required fields: ${missingFields.join(", ")}` },
          { status: 400 }
        );
      }
      
      if (!["TEC", "LCH", "ESO", "HWB", "IIE"].includes(activityData.clubDomain)) {
        return NextResponse.json(
          { success: false, message: "clubDomain must be one of: TEC, LCH, ESO, HWB, IIE" },
          { status: 400 }
        );
      }
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(activityData.ActivityDate)) {
        return NextResponse.json(
          { success: false, message: "ActivityDate must be in YYYY-MM-DD format" },
          { status: 400 }
        );
      }
      
      const participants = parseInt(activityData.ActivityParticipants);
      if (isNaN(participants) || participants < 0) {
        return NextResponse.json(
          { success: false, message: "ActivityParticipants must be a valid non-negative number" },
          { status: 400 }
        );
      }
      
      await pool.query('START TRANSACTION');
      
      try {
        const insertQuery = `
          INSERT INTO overall_activities 
          (ClubName, clubDomain, ActivityName, ActivityDate, ActivityVenue, ActivityType, ActivityReportLink, ActivityParticipants)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        await pool.query(insertQuery, [
          activityData.ClubName.trim(),
          activityData.clubDomain,
          activityData.ActivityName.trim(),
          activityData.ActivityDate.trim(),
          activityData.ActivityVenue.trim(),
          activityData.ActivityType.trim(),
          activityData.ActivityReportLink?.trim() || null,
          participants,
        ]);
        
        await pool.query('COMMIT');
        
        return NextResponse.json({
          success: true,
          message: "Activity added successfully",
          data: activityData
        });
        
      } catch (dbError: any) {
        await pool.query('ROLLBACK');
        throw dbError;
      }
    }
    
    // Handle CSV file upload
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      return NextResponse.json(
        { success: false, message: "Only CSV files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempFilePath = join("/tmp", `activities_${Date.now()}.csv`);
    await writeFile(tempFilePath, new Uint8Array(bytes));

    try {
      const csvContent = buffer.toString("utf-8");
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }) as Record<string, string>[];

      const requiredColumns = [
        "ClubName",
        "clubDomain",
        "ActivityName",
        "ActivityDate",
        "ActivityVenue",
        "ActivityType",
        "ActivityParticipants",
      ];

      const csvColumns = Object.keys(records[0] || {});
      const missingColumns = requiredColumns.filter(
        (col) => !csvColumns.includes(col)
      );

      if (missingColumns.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: `Missing required columns: ${missingColumns.join(", ")}`,
          },
          { status: 400 }
        );
      }

      const validRecords: ActivityData[] = [];
      const errors: string[] = [];

      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const rowNumber = i + 2; 

        try {

          if (!record.ClubName?.trim()) {
            errors.push(`Row ${rowNumber}: ClubName is required`);
            continue;
          }

          if (!record.clubDomain?.trim()) {
            errors.push(`Row ${rowNumber}: clubDomain is required`);
            continue;
          }

          if (!["TEC", "LCH", "ESO", "HWB", "IIE"].includes(record.clubDomain)) {
            errors.push(
              `Row ${rowNumber}: clubDomain must be one of: TEC, LCH, ESO, HWB, IIE`
            );
            continue;
          }

          if (!record.ActivityName?.trim()) {
            errors.push(`Row ${rowNumber}: ActivityName is required`);
            continue;
          }

          if (!record.ActivityDate?.trim()) {
            errors.push(`Row ${rowNumber}: ActivityDate is required`);
            continue;
          }

          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(record.ActivityDate)) {
            errors.push(
              `Row ${rowNumber}: ActivityDate must be in YYYY-MM-DD format`
            );
            continue;
          }

          if (!record.ActivityVenue?.trim()) {
            errors.push(`Row ${rowNumber}: ActivityVenue is required`);
            continue;
          }

          if (!record.ActivityType?.trim()) {
            errors.push(`Row ${rowNumber}: ActivityType is required`);
            continue;
          }

          const participants = parseInt(record.ActivityParticipants);
          if (isNaN(participants) || participants < 0) {
            errors.push(
              `Row ${rowNumber}: ActivityParticipants must be a valid non-negative number`
            );
            continue;
          }

          validRecords.push({
            ClubName: record.ClubName.trim(),
            clubDomain: record.clubDomain as ActivityData["clubDomain"],
            ActivityName: record.ActivityName.trim(),
            ActivityDate: record.ActivityDate.trim(),
            ActivityVenue: record.ActivityVenue.trim(),
            ActivityType: record.ActivityType.trim(),
            ActivityReportLink: record.ActivityReportLink?.trim() || null,
            ActivityParticipants: participants,
          });
        } catch (error) {
          errors.push(`Row ${rowNumber}: Invalid data format`);
        }
      }

      if (errors.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Data validation failed",
            errors: errors.slice(0, 10) 
          },
          { status: 400 }
        );
      }

      if (validRecords.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "No valid records found in CSV file",
          },
          { status: 400 }
        );
      }

      await pool.query('START TRANSACTION');

      try {
       
        const insertQuery = `
          INSERT INTO overall_activities 
          (ClubName, clubDomain, ActivityName, ActivityDate, ActivityVenue, ActivityType, ActivityReportLink, ActivityParticipants)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        for (const record of validRecords) {
          await pool.query(insertQuery, [
            record.ClubName,
            record.clubDomain,
            record.ActivityName,
            record.ActivityDate,
            record.ActivityVenue,
            record.ActivityType,
            record.ActivityReportLink,
            record.ActivityParticipants,
          ]);
        }

        await pool.query('COMMIT');

        return NextResponse.json({
          success: true,
          message: `Successfully uploaded ${validRecords.length} activities`,
          data: {
            totalRecords: validRecords.length,
            processedRecords: validRecords.length,
          },
        });
      } catch (dbError: any) {
        await pool.query('ROLLBACK');
        throw dbError;
      }
    } finally {
      try {
        await unlink(tempFilePath);
      } catch (cleanupError) {
        console.error("Error cleaning up temporary file:", cleanupError);
      }
    }
  } catch (error: any) {
    await pool.query('ROLLBACK');
    console.error("Error in POST /api/admin/activities:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
    
  try {
    const [rows] = await pool.query(
      "SELECT * FROM overall_activities ORDER BY ActivityDate DESC LIMIT 100"
    );

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch activities",
      },
      { status: 500 }
    );
  }
}
