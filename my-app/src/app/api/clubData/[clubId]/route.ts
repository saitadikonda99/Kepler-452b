import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const clubId = req.nextUrl.pathname.split("/").pop();

  try {
   
    await pool.query('START TRANSACTION');

    const [activities]: any = await pool.query(
      `SELECT * FROM activities WHERE club_id = ? ORDER BY upload_at DESC LIMIT 4`,
      [clubId]
    );

    const [glimpse]: any = await pool.query(
      `SELECT * FROM glimpse WHERE club_id = ? ORDER BY upload_at DESC LIMIT 2`,
      [clubId]
    );

    const [clubImages]: any = await pool.query(
      `SELECT * FROM club_images WHERE club_id = ? ORDER BY upload_at DESC LIMIT 1`,
      [clubId]
    );

    const [socials]: any = await pool.query(
      `SELECT s1.*
       FROM socials s1
       JOIN (
           SELECT club_id, social_name, MAX(upload_at) AS min_upload_at
           FROM socials
           GROUP BY club_id, social_name
       ) s2
       ON s1.club_id = s2.club_id
       AND s1.social_name = s2.social_name
       AND s1.upload_at = s2.min_upload_at
       WHERE s1.club_id = ?`,
      [clubId]
    );

    const [stats]: any = await pool.query(
      `SELECT
          (SELECT COUNT(DISTINCT user_id) FROM user_details WHERE club_id = ?) AS total_members,
          (SELECT COUNT(DISTINCT session_name) FROM sessions WHERE session_club_id = ?) AS total_activities,
          (SELECT COUNT(DISTINCT name) FROM club_projects WHERE club_id = ?) AS total_projects
      `, [clubId, clubId, clubId]);

    const [upcomingEvents]: any = await pool.query(
      `SELECT * FROM upcoming_events WHERE club_id = ? ORDER BY upload_at DESC LIMIT 4`,
      [clubId]
    );

    const [clubInfo]: any = await pool.query(
      `SELECT * FROM clubs WHERE id = ?`,
      [clubId]
    );

    const combinedResultsArray = [
      { type: 'activities', data: activities },
      { type: 'glimpse', data: glimpse },
      { type: 'clubImages', data: clubImages },
      { type: 'socials', data: socials },
      { type: 'stats', data: stats },
      { type: 'upcomingEvents', data: upcomingEvents },
      { type: 'clubInfo', data: clubInfo.length > 0 ? clubInfo[0] : null },
    ];

  
    await pool.query('COMMIT');

    return NextResponse.json(combinedResultsArray, { status: 200 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error("Error in clubData:", error);
    return NextResponse.json({ message: "Server error"}, { status: 500 });
  }
};
