import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware"

const handlePost = async (req: NextRequest) => {

    const { valid, payload } = await verifyJWT();
    
    if (!valid) {
        return NextResponse.json({ message: "Unauthorized", status: 401 });
    }
    
    if (!payload) {
        return NextResponse.json({ message: "Unauthorized", status: 401 });
    }
    
    const { authorized, reason: roleReason } = verifyRoles({ ...payload, role: payload.role || 'User' }, 'Admin');
    
    if (!authorized) {
        return NextResponse.json({ message: roleReason, status: 403 });
    }
    
    try {

        const { userId, active } = await req.json();
        console.log(userId, active);

        if (userId == null || active == null) {
            return NextResponse.json({ status: 401 });
        }
          
        await pool.query(
            `UPDATE clubs SET lead_id = NULL WHERE lead_id = ?`
            ,[userId]   
        );

        const [result]: any = await pool.query(
            `UPDATE users SET active = ? WHERE id = ?`
            ,[active, userId]   
        );
     
        return NextResponse.json({ message: "User on hold", status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error, status: 500 });
    }
};


export const POST = withMiddleware(handlePost);