import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import StudentNavbar from "@/app/components/navbar/StudentNavbar";

async function getAuthenticatedUser() {
    const cookieStore = await cookies(); // Added await for Next.js 15
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        
        // Fetch the specific student details using the ID from the token
        const student = await prisma.student.findFirst({
            where: { EnrollmentNo: payload.id as string },
            select: {
                StudentName: true,
                Email: true,
                EnrollmentNo: true,
            }
        });

        return student;
    } catch (error) {
        console.error("Auth error in layout:", error);
        redirect("/login");
    }
}

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const student = await getAuthenticatedUser();

    // Prepare the data for the Navbar component
    const userData = {
        name: student?.StudentName || "Student",
        email: student?.Email || "",
        enrollment: student?.EnrollmentNo || ""
    };

    return (
        <div className="min-h-screen bg-[#EDF0F5]">
            {/* Pass the real student data into your Navbar */}
            <StudentNavbar user={userData} />
            <div className="pt-20">
                {children}
            </div>
        </div>
    );
}