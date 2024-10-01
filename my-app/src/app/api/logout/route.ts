import { cookies } from 'next/headers'
import { jwtVerify } from "jose";
import { pool } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: any) => {
    try {
        
        const cookieStore = cookies()
        const JWT = cookieStore.get('jwt')?.value;

        console.log(JWT);
        if (!JWT) {
            return { valid: false, reason: 'JWT missing' };
        }

        await pool.query(`
            UPDATE users
            SET RefreshToken = null
            WHERE RefreshToken = ?`,
            [JWT]
        );

        cookieStore.set('jwt', '', { maxAge: 0 });

        return NextResponse.json({ message: 'Logged out', status: 200 });
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error logging out', status: 500 });
    }
}
