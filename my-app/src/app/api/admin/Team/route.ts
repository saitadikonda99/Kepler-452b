import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { parse } from "csv-parse/sync";

const MY_KEY = "TeamMembers";

interface TeamMemberData {
  name: string;
  title: string;
  image_url: string;
  linkedin_url?: string;
  email: string;
  category?: string;
  category_id?: number;
  display_order: number;
  is_active: boolean;
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
        name, 
        title, 
        image_url, 
        linkedin_url, 
        email, 
        category, 
        display_order, 
        is_active 
      } = await req.json();

      if (!name || !title || !image_url || !email || !category) {
        return NextResponse.json({
          success: false,
          message: "Name, title, image URL, email, and category are required",
        }, {status: 400});
      }

      await pool.query('START TRANSACTION');

      let usesCategoryId = true;
      try {
        await pool.query('SELECT category_id FROM team_members LIMIT 1');
      } catch (error: any) {
        if (error.code === 'ER_BAD_FIELD_ERROR') {
          usesCategoryId = false;
        }
      }

      if (usesCategoryId) {
        const [categoryResult] = await pool.query(
          'SELECT id FROM team_categories WHERE category_name = ?',
          [category]
        ) as any[];

        if (!categoryResult || categoryResult.length === 0) {
          return NextResponse.json({
            success: false,
            message: "Invalid category. Please select a valid category.",
          }, {status: 400});
        }

        const category_id = categoryResult[0].id;

        if (id) {
          await pool.query(
            `UPDATE team_members 
             SET name = ?, title = ?, image_url = ?, linkedin_url = ?, 
                 email = ?, category_id = ?, display_order = ?, is_active = ?
             WHERE id = ?`,
            [name, title, image_url, linkedin_url, email, category_id, display_order || 0, is_active !== false, id]
          );
        } else {
          await pool.query(
            `INSERT INTO team_members (name, title, image_url, linkedin_url, email, category_id, display_order, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, title, image_url, linkedin_url, email, category_id, display_order || 0, is_active !== false]
          );
        }
      } else {
        if (id) {
          await pool.query(
            `UPDATE team_members 
             SET name = ?, title = ?, image_url = ?, linkedin_url = ?, 
                 email = ?, category = ?, display_order = ?, is_active = ?
             WHERE id = ?`,
            [name, title, image_url, linkedin_url, email, category, display_order || 0, is_active !== false, id]
          );
        } else {
          await pool.query(
            `INSERT INTO team_members (name, title, image_url, linkedin_url, email, category, display_order, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, title, image_url, linkedin_url, email, category, display_order || 0, is_active !== false]
          );
        }
      }

      await pool.query('COMMIT');
      await redisClient.del(MY_KEY);

      return NextResponse.json({ 
        success: true,
        message: id ? "Team member updated successfully" : "Team member created successfully"
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
    const tempFilePath = join("/tmp", `team_${Date.now()}.csv`);
    await writeFile(tempFilePath, new Uint8Array(bytes));

    try {
      const csvContent = buffer.toString("utf-8");
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }) as Record<string, string>[];

      const requiredColumns = [
        "name",
        "title",
        "image_url",
        "email"
      ];
      
      const csvColumns = Object.keys(records[0] || {});
      const hasCategoryId = csvColumns.includes("category_id");
      const hasCategory = csvColumns.includes("category");
      
      if (!hasCategoryId && !hasCategory) {
        return NextResponse.json(
          {
            success: false,
            message: "CSV must contain either 'category_id' or 'category' column",
          },
          { status: 400 }
        );
      }
      
      if (hasCategoryId) {
        requiredColumns.push("category_id");
      } else {
        requiredColumns.push("category");
      }

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

      const validRecords: TeamMemberData[] = [];
      const errors: string[] = [];

      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const rowNumber = i + 2; 

        try {
          if (!record.name?.trim()) {
            errors.push(`Row ${rowNumber}: name is required`);
            continue;
          }

          if (!record.title?.trim()) {
            errors.push(`Row ${rowNumber}: title is required`);
            continue;
          }

          if (!record.image_url?.trim()) {
            errors.push(`Row ${rowNumber}: image_url is required`);
            continue;
          }

          if (!record.email?.trim()) {
            errors.push(`Row ${rowNumber}: email is required`);
            continue;
          }

          const displayOrder = parseInt(record.display_order || "0");
          const isActive = record.is_active?.toLowerCase() === "true" || record.is_active === "1" || record.is_active === "";

          const recordData: TeamMemberData = {
            name: record.name.trim(),
            title: record.title.trim(),
            image_url: record.image_url.trim(),
            linkedin_url: record.linkedin_url?.trim() || "",
            email: record.email.trim(),
            display_order: isNaN(displayOrder) ? 0 : displayOrder,
            is_active: isActive,
          };

          if (hasCategoryId) {
            if (!record.category_id?.trim()) {
              errors.push(`Row ${rowNumber}: category_id is required`);
              continue;
            }

            const categoryId = parseInt(record.category_id);
            if (isNaN(categoryId)) {
              errors.push(`Row ${rowNumber}: category_id must be a valid number`);
              continue;
            }
            
            recordData.category_id = categoryId;
          } else {
            if (!record.category?.trim()) {
              errors.push(`Row ${rowNumber}: category is required`);
              continue;
            }
            
            recordData.category = record.category.trim();
          }

          validRecords.push(recordData);
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
        let dbUsesCategoryId = true;
        try {
          await pool.query('SELECT category_id FROM team_members LIMIT 1');
        } catch (error: any) {
          if (error.code === 'ER_BAD_FIELD_ERROR') {
            dbUsesCategoryId = false;
          }
        }

        for (const record of validRecords) {
          if (dbUsesCategoryId) {
            let categoryId = record.category_id;
            
            if (!categoryId && record.category) {
              const [categoryResult] = await pool.query(
                'SELECT id FROM team_categories WHERE category_name = ?',
                [record.category]
              ) as any[];
              
              if (categoryResult && categoryResult.length > 0) {
                categoryId = categoryResult[0].id;
              } else {
                console.warn(`Category not found: ${record.category}`);
                continue;
              }
            }

            await pool.query(
              `INSERT INTO team_members 
               (name, title, image_url, linkedin_url, email, category_id, display_order, is_active)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                record.name,
                record.title,
                record.image_url,
                record.linkedin_url,
                record.email,
                categoryId,
                record.display_order,
                record.is_active,
              ]
            );
          } else {
            let categoryName = record.category;
            
            if (!categoryName && record.category_id) {
              const [categoryResult] = await pool.query(
                'SELECT category_name FROM team_categories WHERE id = ?',
                [record.category_id]
              ) as any[];
              
              if (categoryResult && categoryResult.length > 0) {
                categoryName = categoryResult[0].category_name;
              } else {
                console.warn(`Category ID not found: ${record.category_id}`);
                continue;
              }
            }

            await pool.query(
              `INSERT INTO team_members 
               (name, title, image_url, linkedin_url, email, category, display_order, is_active)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                record.name,
                record.title,
                record.image_url,
                record.linkedin_url,
                record.email,
                categoryName,
                record.display_order,
                record.is_active,
              ]
            );
          }
        }

        await pool.query('COMMIT');
        await redisClient.del(MY_KEY);

        return NextResponse.json({
          success: true,
          message: `Successfully uploaded ${validRecords.length} team members`,
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
    console.error("Error in POST /api/admin/Team:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};

export const GET = async (req: NextRequest) => {
  try {
    // const data = await redisClient.get(MY_KEY);

    // if (data) {
    //   return NextResponse.json(JSON.parse(data), { status: 200 });
    // }

      // Check if the table has category_id or category column
    let teamMembers;
    try {
      // Try with category_id first (new structure)
      const [result] = await pool.query(
        `SELECT tm.*, tc.category_name as category 
         FROM team_members tm 
         JOIN team_categories tc ON tm.category_id = tc.id 
         WHERE tm.is_active = 1 
         ORDER BY tc.category_name, tm.display_order, tm.name`
      );
      teamMembers = result;
    } catch (error: any) {
      if (error.code === 'ER_BAD_FIELD_ERROR') {
        // Fallback to old structure with category column
        const [result] = await pool.query(
          `SELECT tm.*, tm.category 
           FROM team_members tm 
           WHERE tm.is_active = 1 
           ORDER BY tm.category, tm.display_order, tm.name`
        );
        teamMembers = result;
      } else {
        throw error;
      }
    }

    // await redisClient.setEx(MY_KEY, 300, JSON.stringify(teamMembers));

    return NextResponse.json(teamMembers, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/admin/Team:", error);
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
      return NextResponse.json({ message: "Team member ID is required"}, {status: 400});
    }

    await pool.query('START TRANSACTION');

    await pool.query(
      `UPDATE team_members SET is_active = 0 WHERE id = ?`,
      [id]
    );

    await pool.query('COMMIT');
    await redisClient.del(MY_KEY);

    return NextResponse.json({ message: "Team member deleted successfully"}, {status: 200});
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in DELETE /api/admin/Team:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};
