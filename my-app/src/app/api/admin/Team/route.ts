import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

const MY_KEY = "TeamMembers";

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
        message: "Name, title, image URL, email, and category are required",
        status: 400,
      });
    }

    await pool.query('START TRANSACTION');

    if (id) {
      // Update existing team member
      await pool.query(
        `UPDATE team_members 
         SET name = ?, title = ?, image_url = ?, linkedin_url = ?, 
             email = ?, category = ?, display_order = ?, is_active = ?
         WHERE id = ?`,
        [name, title, image_url, linkedin_url, email, category, display_order || 0, is_active !== false, id]
      );
    } else {
      // Create new team member
      await pool.query(
        `INSERT INTO team_members (name, title, image_url, linkedin_url, email, category, display_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, title, image_url, linkedin_url, email, category, display_order || 0, is_active !== false]
      );
    }

    await pool.query('COMMIT');
    await redisClient.del(MY_KEY);

    return NextResponse.json({ 
      message: id ? "Team member updated successfully" : "Team member created successfully"
    }, {status: 200});
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

    const [teamMembers] = await pool.query(
      `SELECT * FROM team_members 
       WHERE is_active = 1 
       ORDER BY category, display_order, name`
    );

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
