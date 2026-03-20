'use server';

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function AddAnnouncementAction(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error("Unauthorized");
    }

    let userRole: string;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        userRole = decoded.role;
    } catch (error) {
        throw new Error("Invalid session");
    }

    const title = formData.get('Title') as string;
    const message = formData.get('Message') as string;
    const targetRole = formData.get('TargetRole') as any;

    await prisma.announcement.create({
        data: {
            Title: title,
            Message: message,
            TargetRole: targetRole,
            CreatedByRole: userRole === 'admin' ? 'ADMIN' : 'FACULTY',
            IsActive: true,
            Created: new Date(),
            Modified: new Date()
        }
    });

    if (userRole === 'admin') {
        redirect("/admin/announcement");
    } else {
        redirect("/faculty/announcement");
    }
}
