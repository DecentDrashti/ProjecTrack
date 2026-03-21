import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import { UpdateAdminProfileAction } from "@/app/action/UpdateAdminProfileAction";
import Link from "next/link";

export default async function AdminEditProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    let email: string;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        if (payload.role !== 'admin') redirect("/student");
        email = payload.id as string;
    } catch (error) {
        redirect("/login");
    }

    const admin = await prisma.staff.findUnique({
        where: { Email: email }
    });

    if (!admin) redirect("/login");

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-[#201E43] tracking-tight">Edit <span className="text-indigo-600">Admin Identity</span></h2>
                        <p className="text-slate-500 font-medium mt-1">Update global administrative information and credentials.</p>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-900/5 relative overflow-hidden group">
                    <form action={UpdateAdminProfileAction} className="relative z-10 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block px-1">Admin Name</label>
                                <input 
                                    type="text" 
                                    name="StaffName" 
                                    defaultValue={admin.StaffName} 
                                    required
                                    className="w-full bg-white/60 border border-white/80 rounded-2xl p-4 text-sm font-bold text-[#201E43] outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
                                    placeholder="Enter authority name"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block px-1">Email <span className="text-rose-500">(Locked)</span></label>
                                <input 
                                    type="email" 
                                    value={admin.Email || ""} 
                                    disabled
                                    className="w-full bg-slate-100/50 border border-slate-200/50 rounded-2xl p-4 text-sm font-bold text-slate-400 outline-none cursor-not-allowed shadow-inner"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block px-1">Phone</label>
                                <input 
                                    type="text" 
                                    name="Phone" 
                                    defaultValue={admin.Phone || ""} 
                                    className="w-full bg-white/60 border border-white/80 rounded-2xl p-4 text-sm font-bold text-[#201E43] outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
                                    placeholder="+91-XXXXX-XXXXX"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block px-1">Modify Admin Password</label>
                                <input 
                                    type="password" 
                                    name="NewPassword" 
                                    className="w-full bg-white/60 border border-white/80 rounded-2xl p-4 text-sm font-bold text-[#201E43] outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-[#201E43]/5 flex flex-wrap gap-4">
                            <button 
                                type="submit"
                                className="px-10 py-4 bg-[#201E43] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all"
                            >
                                Secure Update Profile
                            </button>
                            <Link 
                                href="/admin/profile" 
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
