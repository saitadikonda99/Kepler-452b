import { pool } from "../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../middleware/middleware";

const postHandler = async (req: NextRequest) => {
  const { valid, payload } = await verifyJWT();
  if (!valid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userData: any = payload;
  const { authorized, reason: roleReason } = verifyRoles(
    { ...userData, role: userData.role || "User" },
    "Admin",
    "club_lead"
  );

  if (!authorized) {
    return NextResponse.json({ message: roleReason }, { status: 403 });
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

    const projectsData = dataRows.map((row) => {
      const values = row.split(",");
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() || null;
        return obj;
      }, {});
    });

    await pool.query("START TRANSACTION");

    // Prepare bulk insert values
    const insertValues = projectsData.map((project) => [
        clubId,
        project.name,
        project.description,
        clubName,
    ]);

    const insertQuery = `
        INSERT INTO club_projects (club_id, name, description, club_name)
        VALUES ?;
    `;

    await pool.query(insertQuery, [insertValues]);
    await pool.query("COMMIT");

    return NextResponse.json({ message: "Projects uploaded successfully"}, { status: 200 });
    
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error(error);
    return NextResponse.json({ message: error.message || "Server error"}, {status: 500});
  }
};


export const POST = withMiddleware(postHandler);
