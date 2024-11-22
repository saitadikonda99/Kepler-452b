import { copyFileSync } from "fs";
import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../lib/verifyJWT";

export const GET = async (req: NextRequest) => {
  try {

    const Key = "academicYears";

    const cache = await redisClient.get(Key);

    // if (cache) {
    //     console.log("Cache hit");
    //   return NextResponse.json(JSON.parse(cache), { status: 200 });
    // }

    const { valid, payload } = await verifyJWT();

    const [result]: any = await pool.query(
      `SELECT *
        FROM academic_years
        WHERE
            CAST(SUBSTRING_INDEX(year_range, '-', 1) AS UNSIGNED) <= 2024  
            AND (CAST(SUBSTRING_INDEX(year_range, '-', -1) AS UNSIGNED) + 2000) >= 2024;  
        `
    );

    await redisClient.setEx(Key, 86400, JSON.stringify(result));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in overAllStats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};