import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        const enrollmentNo = payload.id as string;

        const student = await prisma.student.findUnique({
            where: { EnrollmentNo: enrollmentNo },
            select: {
                StudentName: true,
                Email: true,
                EnrollmentNo: true,
            }
        });

        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({
            name: student.StudentName,
            email: student.Email,
            enrollment: student.EnrollmentNo
        });

    } catch (error) {
        console.error("Auth me error:", error);
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}
