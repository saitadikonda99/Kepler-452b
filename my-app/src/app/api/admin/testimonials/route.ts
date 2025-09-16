import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

const MY_KEY = "Testimonials";

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

    const { testimonialId, testimonialName, testimonialTitle, testimonialImage, testimonialText } = await req.json();

    if (!testimonialName || !testimonialTitle || !testimonialImage || !testimonialText) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    await pool.query('START TRANSACTION');

    if (testimonialId) {
      await pool.query(
        `UPDATE testimonials 
         SET testimonial_name = ?, testimonial_title = ?, testimonial_image = ?, testimonial_text = ?
         WHERE id = ?`,
        [testimonialName, testimonialTitle, testimonialImage, testimonialText, testimonialId]
      );
    } else {
      await pool.query(
        `INSERT INTO testimonials (testimonial_name, testimonial_title, testimonial_image, testimonial_text) 
         VALUES (?, ?, ?, ?)`,
        [testimonialName, testimonialTitle, testimonialImage, testimonialText]
      );
    }

    await pool.query('COMMIT');
    await redisClient.del(MY_KEY);

    return NextResponse.json({ 
      message: testimonialId ? "Testimonial updated successfully" : "Testimonial created successfully"
    }, {status: 200});
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in POST /api/admin/testimonials:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }

    const [testimonials] = await pool.query(
      `SELECT * FROM testimonials ORDER BY id DESC;`
    );

    await redisClient.setEx(MY_KEY, 300, JSON.stringify(testimonials));

    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/admin/testimonials:", error);
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
    const testimonialId = searchParams.get('id');

    if (!testimonialId) {
      return NextResponse.json({
        message: "Testimonial ID is required",
        status: 400,
      });
    }

    await pool.query('START TRANSACTION');

    await pool.query(
      `DELETE FROM testimonials WHERE id = ?`,
      [testimonialId]
    );

    await pool.query('COMMIT');
    await redisClient.del(MY_KEY);

    return NextResponse.json({ message: "Testimonial deleted successfully"}, {status: 200});
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in DELETE /api/admin/testimonials:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};
