import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Make sure this path points to your prisma.ts
import { createToken } from '@/app/lib/auth'; // Path to your auth.ts (jwt logic)
import bcrypt from 'bcrypt'; // 1. Import bcrypt
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
        // 2. 🛡️ THE AUTO-FIXER: Check if password needs hashing
        if (!user.Password.startsWith('$2')) {
            console.log(`Auto-hashing old password for ${role}: ${identifier}`);
            const fixedHash = await bcrypt.hash(user.Password, 10);

            if (role === 'student') {
                await prisma.student.update({
                    where: { EnrollmentNo: user.EnrollmentNo },
                    data: { Password: fixedHash }
                });
            } else {
                await prisma.staff.update({
                    where: { StaffID: user.StaffID }, // Ensure this matches your schema (StaffID)
                    data: { Password: fixedHash }
                });
            }
            
            // Update the local user object so the check below succeeds
            user.Password = fixedHash;
        }
            // // 👇 ADD THESE TWO LINES FOR DEBUGGING
            // console.log("Input Password:", password);
            // console.log("Database Hashed Password:", user.Password);
            // 2. 🛡️ REPLACED: Check hashed password instead of plain text
            const isPasswordMatch = await bcrypt.compare(password, user.Password);

            //         console.log("DEBUG - Password Provided:", password);
            // console.log("DEBUG - Hash in DB:", user.Password);
            // console.log("DEBUG - Match Result:", isPasswordMatch); // 👈 This will tell us TRUE or FALSE
            // ❌ Check password (using plain text as per your current setup)
            if (!isPasswordMatch) {
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
            // --- EXPIRY LOGIC ---
            const minutes = 30;
            const maxAgeInSeconds = minutes * 60; // Result: 1800
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: maxAgeInSeconds // 30 minutes
            });

            return response;

        } catch (error) {
            console.error('DATABASE_ERROR:', error);
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }