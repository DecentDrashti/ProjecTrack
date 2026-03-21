import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import { UpdateFacultyProfileAction } from "@/app/action/UpdateFacultyProfileAction";
import Link from "next/link";

export default async function FacultyEditProfilePage() {
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
                        <h2 className="text-3xl font-black text-[#201E43] tracking-tight">Edit <span className="text-indigo-600">Profile</span></h2>
                        <p className="text-slate-500 font-medium mt-1">Update your personal information and security credentials.</p>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-900/5 relative overflow-hidden group">
                    <form action={UpdateFacultyProfileAction} className="relative z-10 space-y-10">
                        {/* Essential Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block px-1">Full Name</label>
                                <input 
                                    type="text" 
                                    name="StaffName" 
                                    defaultValue={faculty.StaffName} 
                                    required
                                    className="w-full bg-white/60 border border-white/80 rounded-2xl p-4 text-sm font-bold text-[#201E43] outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block px-1">Email <span className="text-rose-500">(Read-only)</span></label>
                                <input 
                                    type="email" 
                                    value={faculty.Email || ""} 
                                    disabled
                                    className="w-full bg-slate-100/50 border border-slate-200/50 rounded-2xl p-4 text-sm font-bold text-slate-400 outline-none cursor-not-allowed shadow-inner"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block px-1">Phone Number</label>
                                <input 
                                    type="text" 
                                    name="Phone" 
                                    defaultValue={faculty.Phone || ""} 
                                    className="w-full bg-white/60 border border-white/80 rounded-2xl p-4 text-sm font-bold text-[#201E43] outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
                                    placeholder="+91-XXXXX-XXXXX"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block px-1">New Password (Keep empty to stay same)</label>
                                <input 
                                    type="password" 
                                    name="NewPassword" 
                                    className="w-full bg-white/60 border border-white/80 rounded-2xl p-4 text-sm font-bold text-[#201E43] outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submission */}
                        <div className="pt-8 border-t border-[#201E43]/5 flex flex-wrap gap-4">
                            <button 
                                type="submit"
                                className="px-10 py-4 bg-[#201E43] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Save Profile Changes
                            </button>
                            <Link 
                                href="/faculty/profile" 
                                className="px-10 py-4 bg-white border border-slate-200 text-[#201E43] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all"
                            >
                                Discard Changes
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
