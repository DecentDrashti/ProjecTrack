import { prisma } from "@/app/lib/prisma";
import React from "react";
import Link from "next/link";
import { UpdateMeetingAction } from '@/app/action/UpdateMeetingAction';

export default async function FacultyEditMeeting({ params }: { params: { id: string } }) {
    const meetingId = parseInt(params.id);

    const meeting = await prisma.projectmeeting.findUnique({
        where: { ProjectMeetingID: meetingId },
        include: { projectgroup: true }
    });

    if (!meeting) return <div className="p-20 text-center font-black">Meeting not found</div>;

    const projectGroups = await prisma.projectgroup.findMany();

    // Format Date for datetime-local input
    const date = new Date(meeting.MeetingDateTime);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    const formattedDate = localDate.toISOString().slice(0, 16);

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-20 flex items-center justify-center p-6 bg-[#EDF0F5]">
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none" style={{ filter: 'url(#goo)' }}>
                <div className="absolute top-[5%] left-[10%] w-[35%] h-[35%] bg-[#201E43]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[45%] h-[45%] bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

                <div className="relative bg-white/40 backdrop-blur-[30px] rounded-[2.5rem] border border-white/60 shadow-2xl shadow-slate-200/50 p-8 md:p-12">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-black text-[#201E43] tracking-tight mb-2 uppercase">Adjust Sync</h1>
                        <p className="text-[#201E43]/60 font-black italic">"Refine the agenda and coordinate with the team."</p>
                    </div>

                    <form action={UpdateMeetingAction} className="space-y-6">
                        <input type="hidden" name="ProjectMeetingID" value={meetingId} />
                        
                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Project Group</label>
                             <select 
                                name="ProjectGroupID" 
                                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                                required
                                defaultValue={meeting.ProjectGroupID}
                             >
                                 {projectGroups.map(g => (
                                     <option key={g.ProjectGroupID} value={g.ProjectGroupID}>{g.ProjectGroupName}</option>
                                 ))}
                             </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Meeting Date & Time</label>
                                <input 
                                    type="datetime-local" 
                                    name="MeetingDateTime" 
                                    defaultValue={formattedDate}
                                    className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Status</label>
                                <select 
                                    name="MeetingStatus" 
                                    className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                                    defaultValue={meeting.MeetingStatus || "SCHEDULED"}
                                >
                                    <option value="SCHEDULED">SCHEDULED</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Meeting Purpose</label>
                             <input 
                                type="text" 
                                name="MeetingPurpose" 
                                defaultValue={meeting.MeetingPurpose || ""}
                                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                                required
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Location</label>
                             <input 
                                type="text" 
                                name="MeetingLocation" 
                                defaultValue={meeting.MeetingLocation || ""}
                                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm"
                                required
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Notes Update</label>
                             <textarea 
                                name="MeetingNotes" 
                                defaultValue={meeting.MeetingNotes || ""}
                                rows={3}
                                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 focus:border-[#201E43]/20 transition-all duration-300 shadow-sm resize-none"
                             />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-5 bg-[#201E43] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl shadow-[#201E43]/20 group shadow-xl shadow-[#201E43]/10"
                        >
                          Push Audit Changes
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
                            Discard Modifications
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
