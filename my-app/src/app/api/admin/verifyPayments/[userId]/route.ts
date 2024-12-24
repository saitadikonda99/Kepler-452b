import { pool } from "../../../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../../../../lib/verifyJWT";
import { verifyRoles } from "../../../../../lib/verifyRoles";
import { withMiddleware } from "../../../../../middleware/middleware";

const handler = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { valid, payload } = await verifyJWT();

    if (!valid || !payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { authorized, reason: roleReason } = verifyRoles(
      { ...payload, role: payload.role || "User" },
      "Admin"
    );

    if (!authorized) {
      return NextResponse.json({ message: roleReason }, { status: 403 });
    }

    if (req.method === 'PUT') {
      const { payment_status } = await req.json();

      console.info(payment_status)
      
      await pool.query(
        'UPDATE user_details SET payment_status = ? WHERE user_id = ?',
        [payment_status, params.userId]
      );

      return NextResponse.json({ message: "Payment status updated successfully" }, { status: 200 });
    }

    if (req.method === 'DELETE') {
      // Start a transaction
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();

        // Get all courses the user is registered for
        const [registrations] : any = await connection.query(
          'SELECT course_id FROM course_registrations WHERE user_id = ?',
          [params.userId]
        );

        // Update the register_students count for each course

        const [updateSlots] : any = await connection.query(
          'UPDATE courses SET register_students = register_students - 1 WHERE id = ?',
          [registrations[0].course_id]
        );
        

        await connection.query('DELETE FROM user_details WHERE user_id = ?', [params.userId]);
        await connection.query('DELETE FROM users WHERE id = ?', [params.userId]);

        await connection.commit();
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
      } catch (error) {
        
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    }

    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PUT = withMiddleware(handler);
export const DELETE = withMiddleware(handler);
