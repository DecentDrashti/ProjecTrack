import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getStudentProfile() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    let enrollmentNo: string;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        enrollmentNo = payload.id as string;
    } catch (error) {
        redirect("/login");
    }

    const student = await prisma.student.findUnique({
        where: { EnrollmentNo: enrollmentNo },
        include: {
            projectgroupmember: {
                include: {
                    projectgroup: true,
                }
            }
        }
    });

    if (!student) redirect("/login");

    const membership = student.projectgroupmember?.[0];
    const projectGroup = membership?.projectgroup;

    return {
        student,
        projectGroup
    };
}

export default async function ProfilePage() {
    const { student, projectGroup } = await getStudentProfile();

    const initials = student.StudentName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-4xl mx-auto mt-8">
                {/* Header Section with personalized greeting */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-[#201E43] tracking-tight">
                        My Profile, <span className="text-indigo-600 font-black">{student.StudentName}</span> 👋
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Viewing your personalized academic profile and project details.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/50">
                    {/* Top Section / Avatar Banner */}
                    <div className="relative h-32 bg-gradient-to-r from-[#201E43] via-indigo-900 to-indigo-800">
                      <div className="absolute -bottom-12 left-10">
                        <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-lg border-4 border-white overflow-hidden">
                          <div className="w-full h-full rounded-full bg-indigo-50 flex items-center justify-center text-3xl font-black text-indigo-600">
                             {initials}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-16 pb-10 px-10">
                        <div className="mb-10">
                            <h2 className="text-2xl font-black text-[#201E43]">{student.StudentName}</h2>
                            <p className="text-indigo-600 font-bold tracking-tight">{student.Email}</p>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <InfoField label="Enrollment Number" value={student.EnrollmentNo} />
                            <InfoField label="Phone Number" value={student.Phone || "Not provided"} />
                            <InfoField label="Department" value="Computer Science & Engineering" /> { /* Defaulting based on context */ }
                            <InfoField label="Project Status" value={projectGroup?.ProjectStatus || "Unassigned"} />
                            
                            {/* Project Details */}
                            <div className="col-span-1 md:col-span-2 mt-4 pt-8 border-t border-slate-100">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Group & Mentorship</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                     <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all group">
                                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Project Group</p>
                                         <p className="text-lg font-black text-[#201E43] group-hover:text-indigo-600 transition-colors">
                                            {projectGroup?.ProjectGroupName || "Not Assigned"}
                                         </p>
                                     </div>
                                     <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all group">
                                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Guide Faculty</p>
                                         <p className="text-lg font-black text-[#201E43] group-hover:text-emerald-600 transition-colors">
                                            {projectGroup?.GuideStaffName || "Allocating soon..."}
                                         </p>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Subtle footer accent */}
                    <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                </div>
            </main>
        </div>
    );
}

function InfoField({ label, value }: { label: string, value: string }) {
    return (
        <div className="space-y-1 group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-base font-bold text-[#201E43] pb-2 border-b border-transparent group-hover:border-slate-100 transition-all">
               {value}
            </p>
        </div>
    );
}
