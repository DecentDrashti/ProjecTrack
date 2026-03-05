"use server"

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function UpdateAdminAction(formData: FormData) {
    const StaffName = formData.get("StaffName") as string;
    const Email = formData.get("Email") as string;
    const Phone = formData.get("Phone") as string;
    const Password = formData.get("Password") as string;
    const DescriptionRaw = formData.get("Description") as string;
    const Description = DescriptionRaw?.trim() || null;

    const data = { StaffName, Email, Phone, Description, Password };

    await prisma.staff.update({
        where: { StaffID: Number(formData.get("StaffID")) },
        data
    });

    revalidatePath("/admin/adminlist");
    redirect("/admin/adminlist");
}

export { UpdateAdminAction };
