import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import AdminNavbar from "@/app/components/navbar/AdminNavbar";
import { getAuthenticatedstaff } from "../faculty/layout";
export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const Admin = await getAuthenticatedstaff();

    // Prepare the data for the Navbar component
    const staffData = {
        name: Admin?.StaffName || "Admin",
        email: Admin?.Email || ""
    };
    return (
        <div className="min-h-screen bg-[#EDF0F5]">
            <AdminNavbar user={staffData}  />
            <div className="pt-20">
                {children}
            </div>
        </div>
    );
}
