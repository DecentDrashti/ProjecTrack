import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Make sure this path points to your prisma.ts
import { createToken } from '@/app/lib/auth'; // Path to your auth.ts (jwt logic)

export async function POST(req: Request) {
    try {
        const { identifier, password, role } = await req.json();

        let user: any = null;

        // 🔹 Search the correct table based on selected role
        if (role === 'student') {
            user = await prisma.student.findFirst({
                where: { EnrollmentNo: identifier },
            });
        } else {
            // Role is 'admin' or 'faculty' - both are in the staff table
            user = await prisma.staff.findFirst({
                where: {
                    Email: identifier,
                    role: role,
                },
            });
        }

        // ❌ Check if user exists
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 401 });
        }

        // ❌ Check password (using plain text as per your current setup)
        if (password !== user.Password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // 🔹 FIX: Convert the ID to a String to ensure the JWT Maker doesn't jam
        const uniqueId = role === 'student' ? String(user.EnrollmentNo) : String(user.Email);

        // 🔹 FIX: Check if Secret exists before signing
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing from .env file");
        }
        // 2. Create the Token using that specific ID
        const token = createToken({
            id: uniqueId,
            role: role,
        });

        const response = NextResponse.json({ role });

        // ✅ Set HTTP-Only Cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            path: '/',
            maxAge: 3600 // 1 hour
        });

        return response;

    } catch (error) {
        console.error('DATABASE_ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}