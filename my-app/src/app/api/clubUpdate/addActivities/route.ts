import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";

const postHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();
  if (!valid) {
    return NextResponse.json({ message: "Unauthorized"}, {status: 401});
  }

  const userData: any = payload;
  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason}, {status: 403});
  }

  try {
    const leadId = userData.id;
    const [clubData]: any = await pool.query(
      `SELECT id, club_name FROM clubs WHERE lead_id = ?`,
      [leadId]
    );

    const clubId = clubData[0]?.id;
    const clubName = clubData[0]?.club_name;

    const csvData = await req.json();
    const rows = csvData.split("\n");
    const headers = rows[0].split(",");
    const dataRows = rows.slice(1);

    const activitiesData = dataRows.map((row) => {
      const values = row.split(",");
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() || null;
        return obj;
      }, {});
    });

    await pool.query("START TRANSACTION");

    // Prepare bulk insert values
    const insertValues = activitiesData.map((activity) => [
      clubId,
      activity.activity_name,
      activity.activity_type.toLowerCase(),
      clubName,
      activity.activity_date,
      activity.venue || null,
      activity.report_link || null,
    ]);

    const insertQuery = `
      INSERT INTO club_activities (
        club_id, activity_name, activity_type, club_name, activity_date, venue, report_link
      ) VALUES ? 
      ON DUPLICATE KEY UPDATE activity_date = VALUES(activity_date)
    `;

    await pool.query(insertQuery, [insertValues]);
    await pool.query("COMMIT");

    return NextResponse.json({message: "Activities uploaded successfully"}, { status: 200 });
    
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error(error);
    return NextResponse.json({ message: error.message || "Server error"}, {status: 500});
  }
};

export const POST = withMiddleware(postHandler);
