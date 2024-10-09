import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";


export const GET  = async (req: NextRequest) => {


  try {
        const [result]: any = await pool.query( 
            `SELECT * FROM clubs`
        );

        return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error}, { status: 500 });
  }
};
