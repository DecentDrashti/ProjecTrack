import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import FacultyNavbar from "@/app/components/navbar/FacultyNavbar";

export async function getAuthenticatedstaff() {
    const cookieStore = await cookies(); // Added await for Next.js 15
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        
        // Fetch the specific staff details using the ID from the token
        const staff = await prisma.staff.findFirst({
            where: { Email: payload.id as string },
            select: {
                StaffName: true,
                Email: true,
            }
        });

        return staff;
    } catch (error) {
        console.error("Auth error in layout:", error);
        redirect("/login");
    }
}
export default  async function FacultyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const Faculty = await getAuthenticatedstaff();

    // Prepare the data for the Navbar component
    const staffData = {
        name: Faculty?.StaffName || "Faculty",
        email: Faculty?.Email || ""
    };
    return (
        <div className="min-h-screen bg-[#EDF0F5]">
            <FacultyNavbar user={staffData} />
            <div className="pt-20">
                {children}
            </div>
        </div>
    );
}
