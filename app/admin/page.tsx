import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

// Lucide-style SVG Icons
const Icons = {
    Projects: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 4 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 4 0 0 1 3-3h7z"/></svg>
    ),
    Faculty: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    Students: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
    ),
    Meetings: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
    ),
    Reviews: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    ),
    Tasks: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
    ),
    Announcements: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    ),
    Activity: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    Shield: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    )
};

// Utility for formatting dates
const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

// Relative time formatter
const getRelativeTime = (date: Date | null) => {
    if (!date) return "N/A";
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

async function getAdminDashboardData() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    let adminEmail: string;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        if (payload.role !== 'admin') redirect("/student");
        adminEmail = payload.id as string;
    } catch (error) {
        redirect("/login");
    }

    const admin = await prisma.staff.findUnique({
        where: { Email: adminEmail }
    });

    if (!admin) redirect("/login");

    // 1. Core Stats
    const totalStudents = await prisma.student.count();
    const totalFaculty = await prisma.staff.count({ where: { role: 'faculty' } });
    const totalGroups = await prisma.projectgroup.count();
    const totalMeetings = await prisma.projectmeeting.count();
    const totalReviews = await prisma.projectreview.count();
    const totalTasks = await prisma.projecttask.count();
    const totalAnnouncements = await prisma.announcement.count();

    // 2. Recent Projects
    const recentProjects = await prisma.projectgroup.findMany({
        orderBy: { Created: 'desc' },
        take: 3
    });

    // 3. Admin Announcements
    const adminAnnouncements = await prisma.announcement.findMany({
        where: { CreatedByRole: 'ADMIN' },
        orderBy: { Created: 'desc' },
        take: 3
    });

    // 4. System Activity Stream
    const latestProjects = await prisma.projectgroup.findMany({ take: 3, orderBy: { Created: 'desc' } });
    const latestReviews = await prisma.projectreview.findMany({ take: 3, orderBy: { Created: 'desc' }, include: { projectgroup: true, staff: true } });
    const latestMeetings = await prisma.projectmeeting.findMany({ take: 3, orderBy: { Created: 'desc' }, include: { projectgroup: true, staff: true } });

    const activities = [
        ...latestProjects.map(p => ({ type: 'PROJECT', title: 'New Group', detail: p.ProjectGroupName, time: p.Created, actor: 'System', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: <Icons.Projects /> })),
        ...latestReviews.map(r => ({ type: 'REVIEW', title: 'Audit Recorded', detail: r.projectgroup.ProjectGroupName, time: r.Created, actor: r.staff.StaffName, color: 'text-emerald-600', bgColor: 'bg-emerald-50', icon: <Icons.Reviews /> })),
        ...latestMeetings.map(m => ({ type: 'MEETING', title: 'Engagement', detail: m.projectgroup.ProjectGroupName, time: m.Created, actor: m.staff.StaffName, color: 'text-indigo-600', bgColor: 'bg-indigo-50', icon: <Icons.Meetings /> }))
    ]
    .sort((a, b) => (b.time?.getTime() || 0) - (a.time?.getTime() || 0))
    .slice(0, 5);

    return {
        admin,
        stats: { totalStudents, totalFaculty, totalGroups, totalMeetings, totalReviews, totalTasks, totalAnnouncements },
        activities,
        adminAnnouncements,
        recentProjects
    };
}

export default async function AdminDashboard() {
    const { admin, stats, activities, adminAnnouncements, recentProjects } = await getAdminDashboardData();

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-[1600px] mx-auto space-y-12">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mt-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#201E43]/5 border border-[#201E43]/10 rounded-full shadow-sm">
                            <Icons.Shield className="text-[#201E43]" />
                            <span className="text-[10px] font-black text-[#201E43] uppercase tracking-[0.2em] leading-none">
                                Admin Authority
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-5xl font-black text-[#201E43] tracking-normal leading-tight">
                                Control <span className="text-indigo-600">Center</span>
                            </h2>
                            <p className="text-slate-500 font-bold text-lg max-w-xl border-l-4 border-slate-100 pl-4 ml-1">
                                High-level oversight of {stats.totalGroups} research groups across the institution.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 md:mt-0 flex gap-4">
                        <Link href="/admin/announcement/add" className="bg-white text-[#201E43] px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] shadow-sm border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all">
                            Blast Notice
                        </Link>
                        <Link href="/admin/project" className="bg-[#201E43] text-white px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-slate-200 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3">
                            <span>Master Vault</span>
                            <Icons.ArrowRight />
                        </Link>
                    </div>
                </header>

                {/* System Overview Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
                    <StatMinimal title="Students" value={stats.totalStudents} icon={<Icons.Students className="w-4 h-4" />} color="text-indigo-600" bgColor="bg-indigo-50" />
                    <StatMinimal title="Faculty" value={stats.totalFaculty} icon={<Icons.Faculty className="w-4 h-4" />} color="text-emerald-600" bgColor="bg-emerald-50" />
                    <StatMinimal title="Groups" value={stats.totalGroups} icon={<Icons.Projects className="w-4 h-4" />} color="text-amber-600" bgColor="bg-amber-50" />
                    <StatMinimal title="Meetings" value={stats.totalMeetings} icon={<Icons.Meetings className="w-4 h-4" />} color="text-rose-600" bgColor="bg-rose-50" />
                    <StatMinimal title="Reviews" value={stats.totalReviews} icon={<Icons.Reviews className="w-4 h-4" />} color="text-blue-600" bgColor="bg-blue-50" />
                    <StatMinimal title="Tasks" value={stats.totalTasks} icon={<Icons.Tasks className="w-4 h-4" />} color="text-violet-600" bgColor="bg-violet-50" />
                    <StatMinimal title="Notices" value={stats.totalAnnouncements} icon={<Icons.Announcements className="w-4 h-4" />} color="text-slate-600" bgColor="bg-slate-50" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    
                    {/* Activity Feed */}
                    <div className="xl:col-span-8 space-y-12">
                        <section className="bg-white/60 backdrop-blur-3xl border border-white rounded-[4rem] p-10 md:p-14 shadow-[0_32px_64px_-16px_rgba(32,30,67,0.06)] relative overflow-hidden group">
                           <div className="flex items-center justify-between mb-14">
                                <h3 className="text-2xl font-black text-[#201E43] flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Icons.Activity className="w-6 h-6" />
                                    </div>
                                    Global Intelligence Stream
                                </h3>
                                <div className="flex items-center gap-2">
                                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Flow</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {activities.map((activity, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 hover:bg-white rounded-[2.5rem] transition-all duration-300 group border border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-indigo-900/5">
                                        <div className="flex items-center gap-8">
                                            <div className={`w-14 h-14 ${activity.bgColor} rounded-2xl flex items-center justify-center text-xl shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-500 ${activity.color}`}>
                                                {activity.icon}
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${activity.color}`}>{activity.title}</p>
                                                <h4 className="font-extrabold text-lg text-[#201E43] mt-1 -tracking-tighter">{activity.detail}</h4>
                                            </div>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <p className="text-base font-black text-[#201E43] tracking-tight">{activity.actor}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-70 group-hover:opacity-100 transition-opacity italic">{getRelativeTime(activity.time)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {recentProjects.map((p) => (
                                <div key={p.ProjectGroupID} className="bg-white/60 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white shadow-xl shadow-indigo-900/5 hover:scale-[1.05] transition-all duration-500 group flex flex-col">
                                     <div className="flex justify-between items-start mb-8">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                                            p.ProjectStatus === 'PROPOSED' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                            p.ProjectStatus === 'APPROVED' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                                            'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        }`}>
                                            {p.ProjectStatus}
                                        </span>
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-colors">
                                             <Icons.Projects className="w-4 h-4" />
                                        </div>
                                     </div>
                                     <h4 className="text-xl font-black text-[#201E43] mb-4 leading-tight group-hover:text-indigo-600 transition-colors flex-1 tracking-tight">{p.ProjectGroupName}</h4>
                                     <div className="pt-6 border-t border-slate-100/50 flex items-center justify-between">
                                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Active Review</p>
                                          <Icons.ArrowRight className="text-slate-200" />
                                     </div>
                                </div>
                            ))}
                        </section>
                    </div>

                    {/* Right Side Column */}
                    <div className="xl:col-span-4 space-y-10">
                        {/* Compact Admin Notices Board */}
                        <section className="bg-white/70 backdrop-blur-3xl p-10 rounded-[4rem] border border-white shadow-xl shadow-indigo-900/5 relative overflow-hidden group">
                           <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-12">
                                     <h3 className="text-lg font-black uppercase tracking-[0.3em] text-[#201E43] opacity-40 italic leading-none">Secure Broadcast</h3>
                                     <Link href="/admin/announcement" className="w-10 h-10 rounded-[1.25rem] bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-all border border-indigo-100">
                                         <Icons.ArrowRight className="w-5 h-5" />
                                     </Link>
                                </div>
                                <div className="space-y-6 mb-12">
                                    {adminAnnouncements.length > 0 ? adminAnnouncements.map((ann) => (
                                        <div key={ann.AnnouncementID} className="relative group/ann p-6 rounded-[2.5rem] bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-900/5 transition-all">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.4)]"></div>
                                                <h4 className="text-[15px] font-black text-[#201E43] truncate transition-colors">{ann.Title}</h4>
                                            </div>
                                            <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2 italic font-medium pl-5 mb-4 border-l-2 border-slate-100 ml-1">
                                                {ann.Message}
                                            </p>
                                            <div className="flex items-center justify-between pl-5">
                                                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{getRelativeTime(ann.Created)}</p>
                                                 <Icons.Shield className="w-4 h-4 text-slate-200 group-hover/ann:text-indigo-600 transition-all shadow-sm" />
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                                            <p className="text-xs text-slate-300 font-black tracking-widest italic uppercase">Encrypted Void</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mt-auto pt-6 border-t border-slate-100">
                                    <p className="text-[11px] text-slate-400 font-bold text-center italic leading-relaxed">Institutional Policy Access Protocol Reserved.</p>
                                </div>
                           </div>

                           {/* Interactive Background Glows (Light Mode) */}
                           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-1000"></div>
                           <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-600/10 transition-all"></div>
                        </section>


                        <section className="bg-white/80 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white shadow-xl shadow-indigo-900/5">
                             <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                                    <Icons.Activity className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#201E43] opacity-40 leading-none mb-1">Infrastructure Load</h4>
                                    <p className="text-lg font-black text-[#201E43] tracking-tighter uppercase italic leading-none">System Engine Health</p>
                                </div>
                             </div>
                             <div className="space-y-6">
                                 <div className="flex justify-between items-center bg-slate-50 p-6 rounded-[2rem] border border-slate-100 group hover:border-indigo-100 transition-all">
                                     <span className="text-xs font-black text-[#201E43] uppercase tracking-widest">Total Engagements</span>
                                     <span className="text-3xl font-black text-indigo-600 tracking-tighter group-hover:scale-110 transition-transform">{stats.totalMeetings + stats.totalReviews}</span>
                                 </div>
                                 <div className="p-6 rounded-[2rem] bg-[#201E43] text-white shadow-xl shadow-indigo-900/10 flex flex-col gap-4">
                                     <div className="flex justify-between items-start">
                                         <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Global Status</p>
                                         <div className="px-2 py-0.5 rounded text-[8px] font-black bg-emerald-500/20 text-emerald-400 uppercase tracking-widest">Optimized</div>
                                     </div>
                                     <p className="text-[11px] text-white/50 font-bold leading-relaxed italic border-l-2 border-indigo-500/30 pl-4 ml-1">
                                         All systems operational. Internal database indexing completed at {formatDate(new Date(), {hour: '2-digit', minute: '2-digit'})}.
                                     </p>
                                 </div>
                             </div>
                        </section>
                    </div>
                </div>

            </main>
        </div>
    );
}

function StatMinimal({ title, value, color, bgColor, icon }: { title: string; value: number; color: string; bgColor: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 hover:-translate-y-1 transition-all duration-300 group text-center flex flex-col items-center">
            <div className={`w-10 h-10 ${bgColor} ${color} rounded-xl flex items-center justify-center mb-4 shadow-inner group-hover:rotate-12 transition-transform`}>
                {icon}
            </div>
            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 leading-none">{title}</h4>
            <div className={`text-3xl font-black ${color} tracking-tighter leading-none group-hover:scale-110 transition-transform`}>{value}</div>
        </div>
    );
}
