import { prisma } from "@/app/lib/prisma";
import React from "react";
import Link from "next/link";
import { AddProjectGroupAction } from '@/app/action/AddProjectGroupAction';

export default async function FacultyAddProject() {
    // 1. Fetch needed data for the form
    const projectTypes = await prisma.projecttype.findMany();
    const allStudents = await prisma.student.findMany({
        orderBy: { StudentName: 'asc' }
    });

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-20 p-6 lg:p-10 bg-[#EDF0F5]">
            {/* Background Blobs */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none" style={{ filter: 'url(#goo)' }}>
                <div className="absolute top-[5%] left-[10%] w-[35%] h-[35%] bg-[#201E43]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[45%] h-[45%] bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] right-[20%] w-[25%] h-[25%] bg-blue-200/30 rounded-full blur-3xl animate-ping opacity-20"></div>
            </div>

            <svg className="hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-[#201E43] tracking-tighter uppercase mb-2">Initialize Project</h1>
                        <p className="text-[#201E43]/40 font-bold text-lg">Create a new synergistic team and define their mission</p>
                    </div>

                    <Link href="/faculty/project" className="flex items-center gap-3 px-6 py-4 bg-white/60 border border-white text-[#201E43]/40 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-[#201E43] transition-all shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        Back to Vault
                    </Link>
                </div>

                <form action={AddProjectGroupAction} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Project Details */}
                    <div className="lg:col-span-7 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 space-y-8">
                         <div className="space-y-2">
                             <label className="text-[11px] font-black text-[#201E43]/50 uppercase tracking-[0.2em] ml-2">Project Vision (Title)</label>
                             <input 
                                type="text" 
                                name="ProjectTitle" 
                                placeholder="Quantum Secure Cloud Architecture" 
                                className="w-full px-6 py-5 bg-white/60 border border-white/80 rounded-[2rem] text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-indigo-100 placeholder:text-[#201E43]/20 shadow-sm transition-all"
                                required
                             />
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[#201E43]/50 uppercase tracking-[0.2em] ml-2">Team Designation</label>
                                <input 
                                    type="text" 
                                    name="ProjectGroupName" 
                                    placeholder="Cyber Avengers" 
                                    className="w-full px-6 py-5 bg-white/60 border border-white/80 rounded-[2rem] text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-indigo-100 placeholder:text-[#201E43]/20 shadow-sm transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[#201E43]/50 uppercase tracking-[0.2em] ml-2">Framework Type</label>
                                <select 
                                    name="ProjectTypeID" 
                                    className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 appearance-none cursor-pointer"
                                    required
                                    defaultValue=""
                                >
                                    <option value="" disabled>Category...</option>
                                    {projectTypes.map(t => <option key={t.ProjectTypeID} value={t.ProjectTypeID}>{t.ProjectTypeName}</option>)}
                                </select>
                            </div>
                         </div>

                         <div className="space-y-2">
                             <label className="text-[11px] font-black text-[#201E43]/50 uppercase tracking-[0.2em] ml-2">Core Area of Research</label>
                             <input 
                                type="text" 
                                name="ProjectArea" 
                                placeholder="Blockchain & Cybersecurity" 
                                className="w-full px-6 py-5 bg-white/60 border border-white/80 rounded-[2rem] text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-indigo-100 placeholder:text-[#201E43]/20 shadow-sm transition-all"
                                required
                             />
                         </div>

                         <div className="space-y-2">
                             <label className="text-[11px] font-black text-[#201E43]/50 uppercase tracking-[0.2em] ml-2">Mission Briefing</label>
                             <textarea 
                                name="ProjectDescription" 
                                placeholder="Define the primary objectives..." 
                                rows={4}
                                className="w-full px-6 py-5 bg-white/60 border border-white/80 rounded-[2rem] text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-indigo-100 placeholder:text-[#201E43]/20 shadow-sm resize-none transition-all"
                                required
                             />
                         </div>
                    </div>

                    {/* Right: Student Recruitment */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/40 flex-1">
                             <div className="flex items-center gap-4 mb-8">
                                 <span className="w-10 h-10 rounded-2xl bg-[#201E43] flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
                                 <h3 className="text-xl font-black text-[#201E43] tracking-tighter">Assemble Talent</h3>
                             </div>

                             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                 {allStudents.map(s => (
                                     <label key={s.StudentID} className="flex items-center gap-4 p-5 bg-white/60 border border-white rounded-3xl cursor-pointer hover:bg-[#201E43] hover:text-white transition-all group active:scale-95">
                                         <input 
                                            type="checkbox" 
                                            name="StudentIDs" 
                                            value={s.StudentID} 
                                            className="w-5 h-5 rounded-lg border-2 border-[#201E43]/20 checked:bg-indigo-600 transition-all accent-indigo-600"
                                         />
                                         <div>
                                             <p className="font-black text-sm tracking-tight">{s.StudentName}</p>
                                             <p className="text-[9px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-70">{s.EnrollmentNo}</p>
                                         </div>
                                     </label>
                                 ))}
                             </div>

                             <div className="mt-10">
                                 <button 
                                    type="submit"
                                    className="w-full py-5 bg-[#201E43] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:scale-[1.05] hover:shadow-2xl hover:shadow-[#201E43]/30 transition-all duration-500 active:scale-95"
                                 >
                                     Finalize Team Launch
                                 </button>
                             </div>
                        </div>

                        <div className="bg-[#201E43] rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
                             <h4 className="text-2xl font-black mb-3 tracking-tight">Collaboration is Key</h4>
                             <p className="text-white/40 text-sm font-black italic">"Choose your team wisely. Their potential is your legacy."</p>
                             <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-white/5 rounded-full blur-[60px] group-hover:bg-white/10 transition-colors"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
