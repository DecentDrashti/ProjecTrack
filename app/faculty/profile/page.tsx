import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function FacultyProfilePage() {
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

    const faculty = await prisma.staff.findUnique({
        where: { Email: email }
    });

    if (!faculty) redirect("/login");

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-[#201E43] tracking-tight">My <span className="text-indigo-600">Profile</span></h2>
                        <p className="text-slate-500 font-medium mt-1">Manage your professional identity and account settings.</p>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-900/5 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                        {/* Avatar Section */}
                        <div className="shrink-0">
                            <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl shadow-indigo-200">
                                <div className="w-full h-full rounded-[2.8rem] bg-white flex items-center justify-center overflow-hidden">
                                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-700">
                                        {faculty.StaffName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 space-y-8 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Full Name</p>
                                    <p className="text-xl font-bold text-[#201E43] tracking-tight">{faculty.StaffName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Address</p>
                                    <p className="text-xl font-bold text-[#201E43] tracking-tight">{faculty.Email}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Designation</p>
                                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full border border-indigo-100 uppercase tracking-widest">
                                        {faculty.role || "Faculty Member"}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Member Since</p>
                                    <p className="text-xl font-bold text-[#201E43] tracking-tight">
                                        {faculty.Created ? new Date(faculty.Created).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-[#201E43]/5 flex flex-wrap gap-4">
                                <Link 
                                    href="/faculty/profile/edit" 
                                    className="px-8 py-4 bg-[#201E43] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    Edit Profile
                                </Link>
                                <Link 
                                    href="/faculty" 
                                    className="px-8 py-4 bg-white border border-slate-200 text-[#201E43] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Background Accents */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-700"></div>
                </div>
            </main>
        </div>
    );
}
