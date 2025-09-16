import { pool } from "../../../../../config/db";
import { redisClient } from "../../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { parse } from "csv-parse/sync";


const KEY = "categories";

interface CategoryData {
  category_name: string;
}

export const POST = async (req: NextRequest) => {
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

    const contentType = req.headers.get("content-type");
    
    if (contentType?.includes("application/json")) {
      const { 
        id,
        categoryName
      } = await req.json();

      if (!categoryName) {
        return NextResponse.json({
          success: false,
          message: "Category name is required",
        }, {status: 400});
      }

      await pool.query('START TRANSACTION');

      if (id) {
        await pool.query(
          `UPDATE team_categories SET category_name = ? WHERE id = ?`,
          [categoryName, id]
        );
      } else {
        await pool.query(
          `INSERT INTO team_categories (category_name) VALUES (?)`,
          [categoryName]
        );
      }

      await pool.query('COMMIT');
      await redisClient.del(KEY);

      return NextResponse.json({ 
        success: true,
        message: id ? "Category updated successfully" : "Category created successfully"
      }, {status: 200});
    }
    
    // Handle CSV file upload
    const formData = await req.formData();
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
    const tempFilePath = join("/tmp", `categories_${Date.now()}.csv`);
    await writeFile(tempFilePath, new Uint8Array(bytes));

    try {
      const csvContent = buffer.toString("utf-8");
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }) as Record<string, string>[];

      const requiredColumns = ["category_name"];

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

      const validRecords: CategoryData[] = [];
      const errors: string[] = [];

      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const rowNumber = i + 2; 

        try {
          if (!record.category_name?.trim()) {
            errors.push(`Row ${rowNumber}: category_name is required`);
            continue;
          }

          validRecords.push({
            category_name: record.category_name.trim(),
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
        const insertQuery = `INSERT INTO team_categories (category_name) VALUES (?)`;

        for (const record of validRecords) {
          await pool.query(insertQuery, [record.category_name]);
        }

        await pool.query('COMMIT');
        await redisClient.del(KEY);

        return NextResponse.json({
          success: true,
          message: `Successfully uploaded ${validRecords.length} categories`,
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
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in POST /api/admin/Team/addCategory:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};

export const GET = async (req: NextRequest) => {
  try {

    const [categories] = await pool.query(
      `SELECT * FROM team_categories 
       ORDER BY category_name`
    );

    await redisClient.setEx(KEY, 300, JSON.stringify(categories));

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
        return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};

export const DELETE = async (req: NextRequest) => {
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: "Category ID is required"}, {status: 400});
    }

    await pool.query('START TRANSACTION');

    await pool.query(
      `DELETE FROM team_categories WHERE id = ?`,
      [id]
    );

    await pool.query('COMMIT');

    await redisClient.del(KEY);

    return NextResponse.json({ message: "Category deleted successfully"}, {status: 200});
  } catch (error) {
    await pool.query('ROLLBACK');
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};
