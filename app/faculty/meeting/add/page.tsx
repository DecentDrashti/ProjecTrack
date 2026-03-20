import { prisma } from "@/app/lib/prisma";
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { AddMeetingAction } from '@/app/action/AddMeetingAction';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function FacultyAddMeeting({ searchParams }: { searchParams: { date?: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return <div>Unauthorized session</div>;

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const email = decoded.id;

    const faculty = await prisma.staff.findFirst({
        where: { Email: email }
    });

    if (!faculty) return <div>Faculty record not found</div>;

    const projectGroups = await prisma.projectgroup.findMany();

    // Handle pre-filled date from calendar click
    // Format should be YYYY-MM-DDTHH:MM for datetime-local
    let defaultDateTime = "";
    if (searchParams.date) {
        defaultDateTime = `${searchParams.date}T09:00`; // Default to 9 AM on selected date
    }

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-20 flex items-center justify-center p-6 bg-[#EDF0F5]">
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

            <div className="relative z-10 w-full max-w-xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

                <div className="relative bg-white/40 backdrop-blur-[30px] rounded-[2.5rem] border border-white/60 shadow-2xl shadow-slate-200/50 p-8 md:p-12">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-black text-[#201E43] tracking-tight mb-2 uppercase">Sync Schedule</h1>
                        <p className="text-[#201E43]/60 font-black">Organize a new project coordination meeting</p>
                    </div>

                    <form action={AddMeetingAction} className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Project Group</label>
                             <select 
                                name="ProjectGroupID" 
                                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                                required
                                defaultValue=""
                             >
                                 <option value="" disabled>Select a dynamic team</option>
                                 {projectGroups.map(g => (
                                     <option key={g.ProjectGroupID} value={g.ProjectGroupID}>{g.ProjectGroupName} ({g.ProjectTitle})</option>
                                 ))}
                             </select>
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Meeting Date & Time</label>
                             <input 
                                type="datetime-local" 
                                name="MeetingDateTime" 
                                defaultValue={defaultDateTime}
                                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                                required
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Meeting Purpose</label>
                             <input 
                                type="text" 
                                name="MeetingPurpose" 
                                placeholder="Final Review Phase 1" 
                                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                                required
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Location</label>
                             <input 
                                type="text" 
                                name="MeetingLocation" 
                                placeholder="Lab 305 / Zoom" 
                                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                                required
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Preliminary Notes</label>
                             <textarea 
                                name="MeetingNotes" 
                                placeholder="Important tasks discussed in previous meeting..." 
                                rows={3}
                                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm resize-none"
                             />
                        </div>

                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-3 py-5 bg-[#201E43] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl shadow-[#201E43]/20 group/btn mt-4 shadow-xl shadow-[#201E43]/10"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:rotate-180 transition-transform duration-500">
                             <line x1="12" y1="5" x2="12" y2="19"></line>
                             <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          Schedule Sync
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <Link
                            href="/faculty/meeting"
                            className="inline-flex items-center gap-2 text-[10px] font-black text-[#201E43]/40 uppercase tracking-widest hover:text-[#201E43] transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            Explore All Syncs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
