import { pool } from "../../../config/db";
import { redisClient } from "../../../config/redis";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

const connection = await pool.getConnection();


  const MY_KEY = "getClubs";

  try {

    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }

    const [result]: any = await connection.query(`SELECT * FROM clubs`);
    
    redisClient.setEx(MY_KEY, 3600, JSON.stringify(result));

    connection.release();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    connection.release();
  }
};
