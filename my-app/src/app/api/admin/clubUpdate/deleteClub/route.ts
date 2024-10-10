import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";

export const POST = async (req: NextRequest) => {

    const connection = await pool.getConnection();

    const { valid, payload } = await verifyJWT();

    if (!valid) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }
  
    const userData: any = payload;
  
    const { authorized, reason: roleReason } = verifyRoles({ ...userData, role: userData.role || 'User' }, 'Admin');
  
    if (!authorized) {
      return NextResponse.json({ message: roleReason, status: 403 });
    }
  
  try {

    const { clubId, active } = await req.json();

    if (clubId == null || active == null) {
        return NextResponse.json({ status: 401 });
    }

    connection.beginTransaction();

        await pool.query(
            `UPDATE clubs SET active = ? WHERE id = ?`
            ,[active, clubId]   
        );

    connection.commit();

    if (active === 1) return NextResponse.json({ status: 200, message: "Club activated successfully" });

    return NextResponse.json({ status: 200, message: "Club deleted successfully" });

  } catch (error) {

    connection.rollback();

    console.log(error)
    return NextResponse.json({ message: error.message}, {status: 500});
  }
};
