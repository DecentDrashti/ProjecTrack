"use client";

const StudentDashboard = () => {
    return (
        <div className="pb-12">
            <main className="max-w-[1600px] mx-auto">
                {/* Banner with a student-friendly message */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-10 px-10">
                    <div>
                        <h2 className="text-3xl font-bold bg-clip-text text-[#201E43] tracking-tight">Student Portal</h2>
                        <small className="text-[#7E8491]">~ Focused on your excellence & progress</small>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-sm font-bold text-[#201E43]">Awaiting Next Meeting</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-10 mb-10">
                    {/* Main Project Summary Card */}
                    <div className="xl:col-span-2 bg-white/40 backdrop-blur-sm p-8 rounded-4xl shadow-sm border border-white/40 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="px-3 py-1 bg-[#201E43] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                        In Progress
                                    </span>
                                    <h3 className="text-2xl font-bold text-[#201E43] mt-3">Smart Attendance System using Face Recognition</h3>
                                    <p className="text-[#7E8491] text-sm mt-1">Research & Development Project</p>
                                </div>
                                <div className="w-16 h-16 bg-[#E1DFF6] rounded-2xl flex items-center justify-center text-[#201E43] font-black text-xl">
                                    SA
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-10">
                                <div>
                                    <p className="text-[10px] font-black text-[#7E8491] uppercase tracking-widest mb-1">Guide Name</p>
                                    <p className="text-sm font-bold text-[#201E43]">Dr. Rajesh Kumar</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-[#7E8491] uppercase tracking-widest mb-1">Project Type</p>
                                    <p className="text-sm font-bold text-[#201E43]">Major Project (Final Year)</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-[#7E8491] uppercase tracking-widest mb-1">Last Submission</p>
                                    <p className="text-sm font-bold text-[#201E43]">Jan 22, 2026</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <div className="flex justify-between text-[11px] font-black text-[#201E43] uppercase tracking-wider mb-2">
                                    <span>Development Progress</span>
                                    <span>65%</span>
                                </div>
                                <div className="h-3 w-full bg-[#EDF0F5] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#201E43] rounded-full w-[65%] shadow-lg"></div>
                                </div>
                            </div>
                        </div>
                        {/* Background design */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
                    </div>

                    {/* Team Members Card */}
                    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-4xl shadow-sm border border-white/40">
                        <h3 className="text-lg font-bold text-[#201E43] mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Team Collaboration
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: "Drashti R.", role: "Leader", img: "https://i.pravatar.cc/100?u=drashti" },
                                { name: "Meet S.", role: "Member", img: "https://i.pravatar.cc/100?u=meet" },
                                { name: "Pooja V.", role: "Member", img: "https://i.pravatar.cc/100?u=pooja" },
                            ].map((member, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/50 rounded-2xl border border-white/40 hover:bg-white transition-all group">
                                    <div className="flex items-center gap-3">
                                        <img src={member.img} className="w-10 h-10 rounded-xl object-cover" alt={member.name} />
                                        <div>
                                            <p className="text-sm font-bold text-[#201E43]">{member.name}</p>
                                            <p className="text-[10px] text-[#7E8491] font-medium transition-colors group-hover:text-[#201E43]">{member.role}</p>
                                        </div>
                                    </div>
                                    {member.role === 'Leader' && (
                                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Engagement & Milestones */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-10">
                    {/* Meeting Overview */}
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white relative overflow-hidden group">
                        <h4 className="text-[10px] font-black text-[#7E8491] uppercase tracking-[0.2em] mb-6">Upcoming Meeting</h4>
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-16 h-16 bg-[#FAD9C5] rounded-3xl flex flex-col items-center justify-center text-[#201E43]">
                                <span className="text-[10px] font-bold uppercase">Jan</span>
                                <span className="text-2xl font-black">28</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#201E43]">Review Module Phase 2</h3>
                                <p className="text-xs text-[#7E8491] mt-1 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" /></svg>
                                    10:30 AM - Lab 402
                                </p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-[#7E8491]">Last Status</span>
                            <span className="text-[10px] font-bold text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full">Completed</span>
                        </div>
                    </div>

                    {/* Attendance Snapshot */}
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white flex flex-col items-center justify-center text-center group">
                        <div className="relative w-24 h-24 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[#EDF0F5]" />
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="25.12" className="text-[#201E43]" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-black text-[#201E43]">90%</span>
                            </div>
                        </div>
                        <h4 className="text-sm font-bold text-[#201E43]">Attendance Snapshot</h4>
                        <p className="text-[10px] text-[#7E8491] mt-1">Excellent consistency! Keep it up.</p>
                    </div>

                    {/* Document Status */}
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white">
                        <h4 className="text-[10px] font-black text-[#7E8491] uppercase tracking-[0.2em] mb-6">Deliverables</h4>
                        <div className="space-y-4">
                            {[
                                { name: "Proposal Draft", status: "Uploaded", color: "text-emerald-500" },
                                { name: "Design Sheets", status: "Uploaded", color: "text-emerald-500" },
                                { name: "Code Prototype", status: "Pending", color: "text-amber-500" },
                            ].map((doc, i) => (
                                <div key={i} className="flex justify-between items-center group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-[#201E43] group-hover:text-white transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                        </div>
                                        <span className="text-xs font-bold text-[#201E43]">{doc.name}</span>
                                    </div>
                                    <span className={`text-[10px] font-black ${doc.color} uppercase tracking-tighter`}>{doc.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
