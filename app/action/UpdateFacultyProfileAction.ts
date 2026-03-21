'use server';

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";

export async function UpdateFacultyProfileAction(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    let email: string;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        email = payload.id as string;
    } catch (error) {
        redirect("/login");
    }

    const staffName = formData.get("StaffName") as string;
    const phone = formData.get("Phone") as string;
    const newPassword = formData.get("NewPassword") as string;

    const data: any = {
        StaffName: staffName,
        Phone: phone,
        Modified: new Date()
    };

    if (newPassword && newPassword.trim() !== "") {
        data.Password = newPassword;
    }

    await prisma.staff.update({
        where: { Email: email },
        data: data
    });

    revalidatePath("/faculty/profile");
    redirect("/faculty/profile");
}
