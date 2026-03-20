import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        const enrollmentNo = payload.id as string;

        const { name, email, password } = await req.json();

        // 1. Validation
        if (!name || !email) {
            return NextResponse.json({ message: "Name and Email are required" }, { status: 400 });
        }

        // 2. Build update data
        const updateData: any = {
            StudentName: name,
            Email: email,
            Modified: new Date(),
        };

        if (password) {
            updateData.Password = password;
        }

        // 3. Update student in database
        const updatedStudent = await prisma.student.update({
            where: { EnrollmentNo: enrollmentNo },
            data: updateData
        });

        return NextResponse.json({ 
            message: "Profile updated successfully ✨", 
            student: { 
                name: updatedStudent.StudentName,
                email: updatedStudent.Email 
            } 
        });

    } catch (error: any) {
        console.error("Profile update error:", error);
        return NextResponse.json({ 
            message: error.message || "Failed to update profile" 
        }, { status: 500 });
    }
}
