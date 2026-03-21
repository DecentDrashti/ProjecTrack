import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function AdminProfilePage() {
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
                        <h2 className="text-3xl font-black text-[#201E43] tracking-tight">Admin <span className="text-indigo-600">Profile</span></h2>
                        <p className="text-slate-500 font-medium mt-1">Management identity and administrative credentials.</p>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-900/5 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                        <div className="shrink-0 text-center">
                            <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-br from-indigo-900 to-slate-900 p-1 shadow-2xl shadow-slate-200">
                                <div className="w-full h-full rounded-[2.8rem] bg-[#201E43] flex items-center justify-center overflow-hidden">
                                     <span className="text-5xl font-black text-white">
                                        {admin.StaffName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-8 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Administrative Name</p>
                                    <p className="text-xl font-bold text-[#201E43] tracking-tight">{admin.StaffName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Secure Email</p>
                                    <p className="text-xl font-bold text-[#201E43] tracking-tight">{admin.Email}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Privilege Level</p>
                                    <span className="px-4 py-1.5 bg-[#201E43] text-white text-[10px] font-black rounded-full border border-[#201E43] uppercase tracking-widest">
                                        SYSTEM-WIDE ADMIN
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Creation Origin</p>
                                    <p className="text-xl font-bold text-[#201E43] tracking-tight">
                                        {admin.Created ? new Date(admin.Created).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'System Default'}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-[#201E43]/5 flex flex-wrap gap-4">
                                <Link 
                                    href="/admin/profile/edit" 
                                    className="px-8 py-4 bg-[#201E43] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    Modify Secure Profile
                                </Link>
                                <Link 
                                    href="/admin" 
                                    className="px-8 py-4 bg-white border border-slate-200 text-[#201E43] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all"
                                >
                                    Master Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
