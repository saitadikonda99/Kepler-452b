import { pool } from '../../../../config/db'
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (req: any) => {
    try {

        const { newsLink, clubName, newsContent} = await req.json();

        if(!newsLink || !clubName || !newsContent) {
            return NextResponse.json({ message: 'All fields are required', status: 400 })
        }

        const response = await pool.query(
            `
            INSERT INTO news_portrait (newsLink, clubName, newsContent)
            VALUES (?, ?, ?)
            `,
            [newsLink, clubName, newsContent]
        )

        const News_portrait = response[0];

        if (!News_portrait) {
            return NextResponse.json({ message: 'News not created', status: 500 })
        }

        return NextResponse.json({ message: 'News created', status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error, status: 500})
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const response = await pool.query(
            `
            SELECT * FROM news_portrait ORDER BY uploadAt DESC LIMIT 4;
            `
        )


        const News_portrait = response[0];


        if(!News_portrait) {
            return NextResponse.json({ message: 'No News found', status: 404 })
        }

        return NextResponse.json(News_portrait, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error, status: 500})
    }
}