import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";

const MY_KEY = "Partners";

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

    const { partnerId, partnerName, partnerImage, partnerLink } = await req.json();

    if (!partnerName || !partnerImage) {
      return NextResponse.json({
        message: "Partner name and image are required",
        status: 400,
      });
    }

    await pool.query('START TRANSACTION');

    if (partnerId) {
      await pool.query(
        `UPDATE partners 
         SET partner_name = ?, partner_image = ?, partner_link = ?
         WHERE id = ?`,
        [partnerName, partnerImage, partnerLink || null, partnerId]
      );
    } else {
      await pool.query(
        `INSERT INTO partners (partner_name, partner_image, partner_link) 
         VALUES (?, ?, ?)`,
        [partnerName, partnerImage, partnerLink || null]
      );
    }

    await pool.query('COMMIT');
    await redisClient.del(MY_KEY);

    return NextResponse.json({ 
      message: partnerId ? "Partner updated successfully" : "Partner created successfully"
    }, {status: 200});
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in POST /api/admin/partners:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }

    const [partners] = await pool.query(
      `SELECT * FROM partners ORDER BY id DESC;`
    );

    await redisClient.setEx(MY_KEY, 300, JSON.stringify(partners));

    return NextResponse.json(partners, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/admin/partners:", error);
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
    const partnerId = searchParams.get('id');

    if (!partnerId) {
      return NextResponse.json({
        message: "Partner ID is required",
        status: 400,
      });
    }

    await pool.query('START TRANSACTION');

    await pool.query(
      `DELETE FROM partners WHERE id = ?`,
      [partnerId]
    );

    await pool.query('COMMIT');
    await redisClient.del(MY_KEY);

    return NextResponse.json({ message: "Partner deleted successfully"}, {status: 200});
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in DELETE /api/admin/partners:", error);
    return NextResponse.json({ message: "Internal server error"}, {status: 500});
  }
};
