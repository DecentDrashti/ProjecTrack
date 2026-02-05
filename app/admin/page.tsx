"use client";

import React from 'react';
import StatCard from '../components/StatCard';

const AdminDashboard = () => {
    return (
        <div className="pb-12">
            <main className="max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-10 px-10">
                    <div>
                        {/* <div className="flex items-center gap-2 mb-2">
                            <div className="h-1 w-12 bg-[#201E43] rounded-full"></div>
                            <span className="text-[10px] font-black text-[#201E43] uppercase tracking-widest">Administrative Control</span>
                        </div> */}
                        <h2 className="text-3xl font-bold bg-clip-text text-[#201E43] tracking-tight">Administrative Dashboard</h2>
                        <p className="text-[#7E8491] font-medium mt-1">Oversight, metrics, and global configuration.</p>
                    </div>
                    <div className="flex items-center gap-4 mt-6 md:mt-0">
                        <button className="bg-white text-[#201E43] px-6 py-3 rounded-2xl font-bold shadow-sm border border-[#EDF0F5] hover:bg-slate-50 transition-all text-xs">
                            Export Reports
                        </button>
                        <button className="bg-[#201E43] text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:opacity-90 transition-all text-xs flex items-center gap-2">
                            System Config
                        </button>
                    </div>
                </div>

                {/* System Overview Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 mb-10">
                    <StatCard
                        title="Total Projects"
                        value="154"
                        change="12%"
                        icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        color="bg-indigo-50 text-indigo-600"
                        trend="up"
                    />
                    <StatCard
                        title="Active In-Review"
                        value="42"
                        change="8%"
                        icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        color="bg-amber-50 text-amber-600"
                        trend="up"
                    />
                    <StatCard
                        title="Pending Approvals"
                        value="18"
                        change="5%"
                        icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        color="bg-rose-50 text-rose-600"
                        trend="down"
                    />
                    <StatCard
                        title="Completed Projects"
                        value="94"
                        change="24%"
                        icon="M5 13l4 4L19 7"
                        color="bg-emerald-50 text-emerald-600"
                        trend="up"
                    />
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-10 mb-10">
                    {/* Project Distribution */}
                    <div className="xl:col-span-2 bg-white/40 backdrop-blur-sm p-8 rounded-4xl shadow-sm border border-white/40">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-bold text-[#201E43]">Project Distribution by Type</h3>
                            <select className="bg-white/50 border border-white/40 rounded-xl px-4 py-2 text-xs font-bold text-[#201E43] outline-none">
                                <option>Current Semester</option>
                                <option>Last Semester</option>
                            </select>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: "AI & Machine Learning", count: 45, max: 60, color: "bg-indigo-600" },
                                { label: "Web Applications", count: 38, max: 60, color: "bg-emerald-600" },
                                { label: "Blockchain & Security", count: 28, max: 60, color: "bg-amber-600" },
                                { label: "Mobile Development", count: 22, max: 60, color: "bg-rose-600" },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-[#201E43]">{item.label}</span>
                                        <span className="text-xs font-black text-[#201E43]">{item.count} Projects</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                                            style={{ width: `${(item.count / item.max) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Faculty Load Summary */}
                    <div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-50 relative overflow-hidden group">
                        <h3 className="text-lg font-bold text-[#201E43] mb-6">Faculty Load Summary</h3>
                        <div className="space-y-5">
                            {[
                                { name: "Dr. Rajesh Kumar", count: 5, status: "Full" },
                                { name: "Prof. Sarah Smith", count: 3, status: "Available" },
                                { name: "Dr. Emily Chen", count: 4, status: "Limited" },
                                { name: "Prof. John Doe", count: 2, status: "Available" },
                            ].map((faculty, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-[#EDF0F5]/30 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all">
                                    <div>
                                        <p className="text-sm font-bold text-[#201E43]">{faculty.name}</p>
                                        <p className="text-[10px] text-[#7E8491] font-medium">{faculty.count} Active Projects</p>
                                    </div>
                                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${faculty.status === 'Full' ? 'bg-rose-50 text-rose-600' :
                                        faculty.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                        {faculty.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activities & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-10">
                    {/* Recent Activities Table */}
                    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-4xl shadow-sm border border-white/40">
                        <h3 className="text-lg font-bold text-[#201E43] mb-6">Recent Activity Stream</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/40">
                                        <th className="pb-4 text-[10px] font-black text-[#7E8491] uppercase tracking-widest">Activity</th>
                                        <th className="pb-4 text-[10px] font-black text-[#7E8491] uppercase tracking-widest">Actor</th>
                                        <th className="pb-4 text-[10px] font-black text-[#7E8491] uppercase tracking-widest text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/20">
                                    {[
                                        { action: "Project Approved", actor: "Dr. Rajesh", target: "Smart Attendance", time: "2 mins ago", color: "text-emerald-500" },
                                        { action: "Doc Uploaded", actor: "Drashti R.", target: "Proposal Draft", time: "15 mins ago", color: "text-[#201E43]" },
                                        { action: "New Submission", actor: "Meet S.", target: "IoT Home Hub", time: "1 hr ago", color: "text-indigo-600" },
                                        { action: "Guide Assigned", actor: "Admin", target: "Prof. Sarah", time: "3 hrs ago", color: "text-amber-600" },
                                    ].map((activity, i) => (
                                        <tr key={i} className="group cursor-default">
                                            <td className="py-4">
                                                <p className={`text-xs font-black ${activity.color}`}>{activity.action}</p>
                                                <p className="text-[10px] text-[#7E8491] mt-0.5">{activity.target}</p>
                                            </td>
                                            <td className="py-4 text-xs font-bold text-[#201E43]">{activity.actor}</td>
                                            <td className="py-4 text-right text-[10px] font-bold text-[#7E8491]">{activity.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Action Center */}
                    <div className="bg-[#201E43] p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-8">Global Action Center</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Approve Projects", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", desc: "18 Pending", color: "bg-emerald-500" },
                                    { label: "Assign Mentors", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", desc: "4 Unassigned", color: "bg-indigo-500" },
                                    { label: "Issue Notices", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z", desc: "To all students", color: "bg-amber-500" },
                                    { label: "View Audit Log", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", desc: "System health: OK", color: "bg-white/10" },
                                ].map((btn, i) => (
                                    <button key={i} className="p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-left flex flex-col gap-3 group/btn">
                                        <div className={`w-10 h-10 rounded-xl ${btn.color} flex items-center justify-center group-hover/btn:scale-110 transition-transform`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={btn.icon} />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black">{btn.label}</p>
                                            <p className="text-[10px] text-white/50 font-bold mt-0.5">{btn.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Abstract decorative elements */}
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
