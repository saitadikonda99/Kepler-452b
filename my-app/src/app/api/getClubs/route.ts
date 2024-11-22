import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { verifyJWT } from "../../../lib/verifyJWT";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {

    const { valid, payload } = await verifyJWT();

    const KEY = "getClubs";

    const cache = await redisClient.get(KEY);

    if (cache) {
      return NextResponse.json(JSON.parse(cache), { status: 200 });
    }

    const [clubs]: any = await pool.query(
      `SELECT * FROM clubs`
    );

    await redisClient.setEx(KEY, 86400, JSON.stringify(clubs));

    return NextResponse.json(clubs, { status: 200 });
  } catch (error) {
    console.error("Error in getClubs:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};