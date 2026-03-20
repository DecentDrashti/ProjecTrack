import { prisma } from "@/app/lib/prisma";
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import MeetingCalendar from '@/app/components/meeting/MeetingCalendar';
import MeetingActions from '@/app/components/meeting/MeetingActions';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function FacultyMeetingPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return <div className="p-20 text-center font-black text-[#201E43]/50">Unauthorized session</div>;

    let email: string;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        email = decoded.id; 
    } catch (e) {
        return <div className="p-20 text-center font-black text-rose-500">Invalid session</div>;
    }

    const faculty = await prisma.staff.findFirst({
        where: { Email: email }
    });

    if (!faculty) return <div className="p-20 text-center font-black text-[#201E43]">Faculty profile not found</div>;

    const meetings = await prisma.projectmeeting.findMany({
        where: {
            GuideStaffID: faculty.StaffID
        },
        include: {
            projectgroup: {
                include: {
                    projectgroupmember: {
                        include: {
                            student: true
                        }
                    }
                }
            }
        },
        orderBy: {
            MeetingDateTime: 'desc'
        }
    });

    // Extract ISO strings of dates with meetings for indicator
    const meetingDates = meetings.map(m => m.MeetingDateTime.toISOString());

    return (
        <div className="min-h-screen bg-[#EDF0F5] pb-20 p-6 lg:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-[#201E43] tracking-tight mb-2 uppercase tracking-tight">Sync Schedules</h1>
                        <p className="text-[#201E43]/40 font-bold text-lg">Manage your project group interactions and reviews</p>
                    </div>

                    <Link href="/faculty/meeting/add" className="flex items-center gap-3 px-8 py-5 bg-[#201E43] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-2xl shadow-[#201E43]/20">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </div>
                        Broadcast New Meeting
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Dynamic Calendar */}
                    <div className="lg:col-span-4 space-y-8">
                        <MeetingCalendar meetingDates={meetingDates} />

                        <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20 group">
                             <div className="relative z-10">
                                 <h4 className="text-xl font-black mb-1 opacity-60 uppercase tracking-widest text-[10px]">Insight</h4>
                                 <p className="text-2xl font-bold leading-tight">Sync Sessions: <span className="text-white/60">{meetings.length}</span></p>
                                 <p className="mt-4 text-white/50 font-black italic text-sm">"Consistent feedback loops accelerate engineering excellence."</p>
                             </div>
                             <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>

                    {/* Right: Meeting List */}
                    <div className="lg:col-span-8 space-y-8">
                        {meetings.length > 0 ? (
                            meetings.map((m) => {
                                const mDate = new Date(m.MeetingDateTime);
                                return (
                                    <div key={m.ProjectMeetingID} className="group relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-8 md:p-10 shadow-2xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-500">
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                            <div className="flex items-start gap-6">
                                                <div className="flex flex-col items-center bg-[#201E43] text-white p-4 rounded-[1.5rem] min-w-[70px] shadow-xl shadow-[#201E43]/10">
                                                    <span className="text-[9px] font-black uppercase opacity-60 mb-0.5">{mDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                                                    <span className="text-2xl font-black">{mDate.getDate()}</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="px-3 py-1 bg-[#201E43]/5 text-[#201E43] border border-[#201E43]/10 rounded-full text-[9px] font-black uppercase tracking-widest">{m.MeetingStatus}</span>
                                                        <span className="text-[10px] font-black text-[#201E43]/30 uppercase tracking-[0.2em]">{mDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                    <h2 className="text-2xl font-black text-[#201E43] tracking-tight mb-2 uppercase">{m.MeetingPurpose}</h2>
                                                    <p className="text-[#201E43]/50 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                                        {m.MeetingLocation}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Buttons via Client Component */}
                                            <MeetingActions meetingId={m.ProjectMeetingID} />
                                        </div>

                                        <div className="mt-8 pt-8 border-t border-[#201E43]/5 flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 bg-white/20 px-4 py-2 rounded-2xl border border-white/40 shadow-sm transition-all duration-300">
                                                <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-indigo-500/20">{m.projectgroup.ProjectGroupName?.[0]}</div>
                                                <p className="text-[11px] font-black text-[#201E43] uppercase tracking-tighter opacity-70">Group: {m.projectgroup.ProjectGroupName}</p>
                                            </div>

                                            <div className="flex -space-x-3">
                                                {m.projectgroup.projectgroupmember.map((member, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[9px] font-black text-[#201E43]/40 shadow-sm" title={member.student.StudentName}>
                                                        {member.student.StudentName.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="bg-white/30 border-4 border-dashed border-white/60 rounded-[3rem] p-24 text-center">
                                <h3 className="text-3xl font-black text-[#201E43] opacity-20 tracking-tighter uppercase">No Active Syncs</h3>
                                <p className="text-[#201E43]/30 font-bold mt-2 italic">Productive groups maintain consistent sync-ups. Schedule one now.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}