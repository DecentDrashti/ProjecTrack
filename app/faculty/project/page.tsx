import { prisma } from "@/app/lib/prisma";
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function FacultyProjectPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return <div className="p-20 text-center font-black">Unauthorized session</div>;

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const email = decoded.id; // Correct identifier for faculty

    const faculty = await prisma.staff.findFirst({
        where: { Email: email }
    });

    if (!faculty) return <div className="p-20 text-center font-black">Faculty record not found</div>;

    const projects = await prisma.projectgroup.findMany({
        where: {
            GuideStaffName: faculty.StaffName
        },
        include: {
            projectgroupmember: {
                include: {
                    student: true
                }
            }
        },
        orderBy: {
            Created: 'desc'
        }
    });

    return (
        <div className="min-h-screen bg-[#EDF0F5] pb-20 p-6 lg:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-[#201E43] tracking-tighter uppercase mb-2">Project Vault</h1>
                        <p className="text-[#201E43]/40 font-bold text-lg">Manage your guided initiatives and synergistic teams</p>
                    </div>

                    <Link href="/faculty/project/add" className="flex items-center gap-3 px-8 py-5 bg-[#201E43] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-2xl shadow-[#201E43]/20">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </div>
                        Launch New Initiative
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map((p) => (
                            <div key={p.ProjectGroupID} className="relative group bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-8 shadow-2xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="px-3 py-1 bg-[#201E43]/5 text-[#201E43] border border-[#201E43]/10 rounded-full text-[9px] font-black uppercase tracking-widest">{p.ProjectStatus}</span>
                                        <div className="flex -space-x-3">
                                             {p.projectgroupmember.map((member, i) => (
                                                 <div key={member.StudentID} className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[9px] font-black text-[#201E43]/40 shadow-sm" title={member.student.StudentName}>
                                                      {member.student.StudentName[0]}
                                                 </div>
                                             ))}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-black text-[#201E43] tracking-tighter mb-2 line-clamp-1">{p.ProjectTitle}</h3>
                                    <p className="text-[#201E43]/40 font-black text-[10px] uppercase tracking-widest mb-4">Team: {p.ProjectGroupName}</p>
                                    
                                    <p className="text-[#201E43]/60 text-sm font-bold line-clamp-2 italic mb-8">
                                        "{p.ProjectDescription || "No project briefing provided yet."}"
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-[#201E43]/5">
                                         <div className="flex items-center gap-2">
                                             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{p.ProjectArea || "General"}</span>
                                         </div>
                                         <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Full Audit</button>
                                    </div>
                                </div>
                                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 bg-white/30 border-4 border-dashed border-white/60 rounded-[3rem] text-center">
                            <h3 className="text-3xl font-black text-[#201E43] opacity-20 tracking-tighter">Vault is Empty</h3>
                            <p className="text-[#201E43]/30 font-bold mt-2">Ready to launch a new synergistic mission?</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
