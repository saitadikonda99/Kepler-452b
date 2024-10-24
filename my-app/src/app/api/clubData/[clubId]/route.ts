import { pool } from "../../../../config/db";
import { redisClient } from "../../../../config/redis";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const connection = await pool.getConnection();

  const clubId = req.nextUrl.pathname.split("/").pop();

  console.log(clubId);

  const MY_KEY = `clubData${clubId}`;

  try {
    const data = await redisClient.get(MY_KEY);

    if (data) {
      return NextResponse.json(JSON.parse(data), { status: 200 });
    }

    connection.beginTransaction()

    // Fetching data from various tables, including the clubs table

const [activities]: any = await connection.query(
    `SELECT * FROM activities WHERE club_id = ? ORDER BY upload_at DESC LIMIT 4`,
    [clubId]
);

const [glimpse]: any = await connection.query(
    `SELECT * FROM glimpse WHERE club_id = ? ORDER BY upload_at DESC LIMIT 2`,
    [clubId]
);

const [clubImages]: any = await connection.query(
    `SELECT * FROM club_images WHERE club_id = ? ORDER BY upload_at DESC LIMIT 1`,
    [clubId]
);

const [socials]: any = await connection.query(
    `
        SELECT s1.*
        FROM socials s1
        JOIN (
            SELECT club_id, social_name, MAX(upload_at) AS min_upload_at
            FROM socials
            GROUP BY club_id, social_name
        ) s2
        ON s1.club_id = s2.club_id
        AND s1.social_name = s2.social_name
        AND s1.upload_at = s2.min_upload_at
        WHERE s1.club_id = ?
    `,
    [clubId]
);

const [stats]: any = await connection.query(
    `SELECT * FROM stats WHERE club_id = ? ORDER BY upload_at DESC LIMIT 1`,
    [clubId]
);

const [upcomingEvents]: any = await connection.query(
    `SELECT * FROM upcoming_events WHERE club_id = ? ORDER BY upload_at DESC LIMIT 4`,
    [clubId]
);

// Fetching club information from the clubs table
const [clubInfo]: any = await connection.query(
    `SELECT * FROM clubs WHERE id = ?`,
    [clubId]
);

// Combine all results into a single object
const combinedResults = {
    activities,
    glimpse,
    clubImages,
    socials,
    stats,
    upcomingEvents,
    clubInfo: clubInfo.length > 0 ? clubInfo[0] : null, // Get the first club info or null if not found
};

const combinedResultsArray = [
    { type: 'activities', data: activities },
    { type: 'glimpse', data: glimpse },
    { type: 'clubImages', data: clubImages },
    { type: 'socials', data: socials },
    { type: 'stats', data: stats },
    { type: 'upcomingEvents', data: upcomingEvents },
    { type: 'clubInfo', data: clubInfo.length > 0 ? clubInfo[0] : null }, // Add club info
];



    redisClient.setEx(MY_KEY, 3600, JSON.stringify(combinedResultsArray));
    connection.commit();
    connection.release();

    return NextResponse.json(combinedResultsArray, { status: 200 });

  } catch (error) {
    connection.rollback();
    connection.release();
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    connection.release();
  }
};
