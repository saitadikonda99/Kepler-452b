import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware"


const postHandler = async (req: NextRequest) => {

  const { valid, payload } = await verifyJWT();

  if (!valid) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const userData: any = payload;

  const { authorized, reason: roleReason } = verifyRoles({ ...userData, role: userData.role || 'User' }, 'Admin', 'club_lead');

  if (!authorized) {
    return NextResponse.json({ message: roleReason, status: 403 });
  }

  try {

        const leadId = userData.id;

        const clubData = await pool.query(
            `SELECT id FROM clubs WHERE lead_id = ?`,
            [leadId]
        );

        const clubId = clubData[0][0].id;
    
        const csvData = await req.json();

        const rows = csvData.split("\n");
        const headers = rows[0].split(",");
        const dataRows = rows.slice(1);

        const studentData = dataRows.map((row) => {
        const values = row.split(",");
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim() || null; 
            return obj;
        }, {});
        });

    await pool.query('START TRANSACTION');


  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error, status: 500 });
  } 
};