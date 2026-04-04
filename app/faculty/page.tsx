import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

// Lucide-style SVG Icons
const Icons = {
    Projects: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 4 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 4 0 0 1 3-3h7z"/></svg>
    ),
    Students: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    Meetings: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
    ),
    Reviews: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    ),
    Tasks: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
    ),
    ArrowRight: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    ),
    Sparkles: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
    ),
    Info: ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    )
};

// Utility for formatting dates
const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

async function getFacultyDashboardData() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    let facultyEmail: string;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        facultyEmail = payload.id as string;
    } catch (error) {
        redirect("/login");
    }

    const faculty = await prisma.staff.findUnique({
        where: { Email: facultyEmail }
    });

    if (!faculty) redirect("/login");

    // 1. Projects & Students
    const groupsUnderFaculty = await prisma.projectgroup.findMany({
        where: {
            OR: [
                { ConvenerStaffID: faculty.StaffID },
                { ExpertStaffID: faculty.StaffID },
                { projectmeeting: { some: { GuideStaffID: faculty.StaffID } } }
            ]
        },
        include: {
            projectreview: {
                orderBy: { Created: 'desc' },
                take: 1
            }
        }
    });

    const totalGroups = groupsUnderFaculty.length;
    const groupIds = groupsUnderFaculty.map(g => g.ProjectGroupID);

    const totalStudents = await prisma.projectgroupmember.count({
        where: { ProjectGroupID: { in: groupIds } }
    });

    const averageProgress = groupsUnderFaculty.length > 0
        ? Math.round(groupsUnderFaculty.reduce((acc, g) => acc + (g.projectreview[0]?.ProgressPercent || 0), 0) / groupsUnderFaculty.length)
        : 0;

    // 2. Meetings & Reviews
    const totalMeetings = await prisma.projectmeeting.count({ where: { GuideStaffID: faculty.StaffID } });
    const upcomingMeetings = await prisma.projectmeeting.findMany({
        where: { 
            GuideStaffID: faculty.StaffID,
            MeetingDateTime: { gte: new Date() }
        },
        include: { projectgroup: true },
        orderBy: { MeetingDateTime: 'asc' },
        take: 3
    });

    const totalReviews = await prisma.projectreview.count({ where: { GuideStaffID: faculty.StaffID } });
    const recentReviews = await prisma.projectreview.findMany({
        where: { GuideStaffID: faculty.StaffID },
        include: { projectgroup: true },
        orderBy: { Created: 'desc' },
        take: 3
    });

    const totalTasks = await prisma.projecttask.count({ where: { GuideStaffID: faculty.StaffID } });

    // 3. Faculty Announcements
    const facultyAnnouncements = await prisma.announcement.findMany({
        where: { CreatedByRole: 'ADMIN' },
        orderBy: { Created: 'desc' },
        take: 3
    });

    return {
        faculty,
        stats: {
            totalGroups,
            totalStudents,
            totalMeetings,
            totalReviews,
            totalTasks,
            averageProgress
        },
        upcomingMeetings,
        recentReviews,
        facultyAnnouncements
    };
}

export default async function FacultyDashboard() {
    const { faculty, stats, upcomingMeetings, recentReviews, facultyAnnouncements } = await getFacultyDashboardData();

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-[1600px] mx-auto space-y-12">
                
                {/* Hero Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mt-6 -mb-2">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full shadow-sm">
                            <Icons.Sparkles className="text-indigo-600" />
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] leading-none">
                                Faculty Dashboard
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-5xl font-black text-[#201E43] tracking-normal leading-tight">
                                Welcome, <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">{faculty.StaffName.split(' ')[0]}</span>
                            </h2>
                            <p className="text-slate-500 font-bold text-lg max-w-xl border-l-4 border-indigo-100 pl-4 ml-1">
                                Supervising {stats.totalGroups} research groups and academic progress.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 md:mt-0 flex gap-4">
                         <Link href="/faculty/project" className="bg-[#201E43] text-white px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-indigo-200 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3">
                            <span>Project Vault</span>
                            <Icons.ArrowRight />
                        </Link>
                    </div>
                </header>
                <div></div>
                {/* Premium Stat Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    <PremiumStatCard 
                        title="Active Projects" 
                        value={stats.totalGroups} 
                        icon={<Icons.Projects />} 
                        color="indigo" 
                        subtext="Ongoing Supervisions"
                    />
                    <PremiumStatCard 
                        title="Total Students" 
                        value={stats.totalStudents} 
                        icon={<Icons.Students />} 
                        color="emerald" 
                        subtext="Managed Cohort"
                    />
                    <PremiumStatCard 
                        title="Meetings" 
                        value={stats.totalMeetings} 
                        icon={<Icons.Meetings />} 
                        color="blue" 
                        subtext="Scheduled Discussions"
                    />
                    <PremiumStatCard 
                        title="Score Progress" 
                        value={`${stats.averageProgress}%`} 
                        icon={<Icons.Reviews />} 
                        color="amber" 
                        subtext="Avg. Group Health"
                    />
                    <PremiumStatCard 
                        title="Assigned Tasks" 
                        value={stats.totalTasks} 
                        icon={<Icons.Tasks />} 
                        color="rose" 
                        subtext="Pending Deliverables"
                    />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    
                    {/* Left: Upcoming Timeline & Progress */}
                    <div className="xl:col-span-8 space-y-12">
                        
                        {/* Progressive Timeline Section */}
                        <section className="bg-white/60 backdrop-blur-3xl border border-white rounded-[3.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(32,30,67,0.06)] relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-2xl font-black text-[#201E43] flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                                        <Icons.Meetings className="w-6 h-6" />
                                    </div>
                                    Timeline Supervisions
                                </h3>
                                <Link href="/faculty/meeting" className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                                    View Calendar ➔
                                </Link>
                            </div>

                            <div className="relative space-y-1">
                                {/* Timeline Line */}
                                <div className="absolute left-[31px] top-4 bottom-4 w-1 bg-gradient-to-b from-indigo-100 via-slate-100 to-indigo-100 rounded-full hidden md:block"></div>

                                {upcomingMeetings.length > 0 ? upcomingMeetings.map((meeting, i) => (
                                    <div key={meeting.ProjectMeetingID} className="relative flex flex-col md:flex-row items-start md:items-center gap-8 p-6 rounded-[2.5rem] hover:bg-white/80 transition-all group border border-transparent hover:border-indigo-50/50 hover:shadow-xl hover:shadow-indigo-900/5">
                                        {/* Point on timeline */}
                                        <div className="hidden md:flex absolute left-6 w-4 h-4 rounded-full bg-white border-4 border-indigo-400 z-10 group-hover:scale-150 transition-transform shadow-sm"></div>

                                        <div className="flex flex-row items-center gap-6 md:ml-10">
                                            <div className="w-16 h-16 bg-[#201E43] rounded-[1.5rem] flex flex-col items-center justify-center text-white shrink-0 shadow-xl overflow-hidden group-hover:bg-indigo-600 transition-colors">
                                                <span className="text-[9px] font-black uppercase opacity-60 tracking-widest">{new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(meeting.MeetingDateTime))}</span>
                                                <span className="text-2xl font-black leading-none">{new Date(meeting.MeetingDateTime).getDate()}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black text-[#201E43] tracking-tight group-hover:text-indigo-600 transition-colors">{meeting.projectgroup.ProjectGroupName}</h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{meeting.MeetingPurpose}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                                    <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:ml-auto w-full md:w-auto">
                                            <Link href={`/faculty/meeting/${meeting.ProjectMeetingID}/attendance`} className="block w-full text-center px-8 py-4 bg-white border border-slate-100 text-[#201E43] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#201E43] hover:text-white hover:border-transparent transition-all shadow-sm">
                                                Audit Attendance
                                            </Link>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="py-20 text-center">
                                         <p className="text-slate-300 font-black tracking-[0.2em] text-sm uppercase italic">No Pending Sessions</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Recent Reviews with Progress Variety */}
                        <section className="bg-white/60 backdrop-blur-3xl border border-white rounded-[3.5rem] p-12 shadow-[0_32px_64px_-16px_rgba(32,30,67,0.06)] relative">
                             <h3 className="text-2xl font-black text-[#201E43] mb-12 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
                                    <Icons.Reviews className="w-6 h-6" />
                                </div>
                                Academic Audits
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {recentReviews.map((review) => (
                                    <div key={review.ReviewID} className="bg-white/80 p-8 rounded-[3rem] border border-white shadow-lg shadow-indigo-900/5 hover:scale-[1.05] transition-all group flex flex-col">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                <Icons.Projects className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-300">{new Date(review.Created || new Date()).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="text-base font-black text-[#201E43] mb-2 leading-tight flex-1 tracking-tight">{review.projectgroup.ProjectTitle}</h4>
                                        <div className="mt-8 space-y-3">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                                                <span className="text-sm font-black text-indigo-600 italic">{review.ProgressPercent}%</span>
                                            </div>
                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                                                <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-all duration-1000" style={{ width: `${review.ProgressPercent}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Supervision Insight & Compact Notices */}
                    <div className="xl:col-span-4 space-y-10">
                        
                         {/* Supervision Insight (Premium Glassmorphism) */}
                         <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 p-10 rounded-[3.5rem] shadow-2xl shadow-indigo-900/20 text-white relative overflow-hidden group border border-white/10">
                             <div className="relative z-10">
                                 <h3 className="text-sm font-black mb-8 uppercase tracking-[0.3em] opacity-40 leading-none">Supervision Health</h3>
                                 <div className="space-y-8">
                                     <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 hover:bg-white/20 transition-all">
                                          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-3 text-indigo-200">Managed Students</p>
                                          <div className="flex items-baseline gap-4">
                                            <p className="text-6xl font-black text-white tracking-tighter">{stats.totalStudents}</p>
                                            <span className="text-sm font-bold text-white/40 uppercase tracking-widest italic leading-none">Total</span>
                                          </div>
                                          <p className="text-[11px] font-semibold mt-6 text-white/50 leading-relaxed italic">Developing research capacity across {stats.totalGroups} active groups.</p>
                                     </div>

                                     <div className="grid grid-cols-2 gap-4">
                                          <div className="bg-white/5 p-5 rounded-[2rem] border border-white/10">
                                              <p className="text-[9px] font-black opacity-40 uppercase tracking-widest mb-2">Projects</p>
                                              <p className="text-2xl font-black tracking-tight leading-none">{stats.totalGroups}</p>
                                          </div>
                                          <div className="bg-white/5 p-5 rounded-[2rem] border border-white/10 text-right">
                                              <p className="text-[9px] font-black opacity-40 uppercase tracking-widest mb-2">Avg. Score</p>
                                              <p className="text-2xl font-black tracking-tight leading-none text-emerald-300">{stats.averageProgress}%</p>
                                          </div>
                                     </div>
                                 </div>
                             </div>

                             {/* Abstract Shapes for variety */}
                             <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-white/20 transition-all duration-1000"></div>
                             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none transition-all"></div>
                         </section>

                        {/* Compact Notices Board */}
                        <section className="bg-white/80 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white shadow-xl shadow-indigo-900/5 h-fit">
                            <div className="flex items-center justify-between mb-10 px-2">
                                <h3 className="text-xl font-black text-[#201E43] tracking-tight flex items-center gap-3">
                                    <Icons.Sparkles className="text-amber-500 w-5 h-5" />
                                    Active Notices
                                </h3>
                                <Link href="/faculty/announcement" className="w-8 h-8 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                                    <Icons.ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="space-y-6">
                                {facultyAnnouncements.length > 0 ? facultyAnnouncements.map((ann) => (
                                    <div key={ann.AnnouncementID} className="relative group/note p-4 rounded-[1.5rem] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                            <h4 className="text-[13px] font-black text-[#201E43] truncate">{ann.Title}</h4>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold line-clamp-2 leading-relaxed italic pl-3.5 mb-2">
                                            {ann.Message}
                                        </p>
                                        <div className="flex items-center justify-between pl-3.5 pt-1">
                                            <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest">{formatDate(new Date(ann.Created || new Date()), {day: 'numeric', month: 'short'})}</p>
                                            <Icons.Info className="text-slate-200 w-4 h-4" />
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                                        <p className="text-xs text-slate-300 font-black italic uppercase tracking-widest">No New Bulletins</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>

            </main>
        </div>
    );
}

function PremiumStatCard({ title, value, icon, color, subtext }: { title: string; value: string | number; icon: React.ReactNode; color: string; subtext?: string }) {
    const colorMap: Record<string, string> = {
        indigo: "bg-indigo-500 shadow-indigo-200 text-indigo-600",
        emerald: "bg-emerald-500 shadow-emerald-200 text-emerald-600",
        blue: "bg-blue-500 shadow-blue-200 text-blue-600",
        amber: "bg-amber-500 shadow-amber-200 text-amber-600",
        rose: "bg-rose-500 shadow-rose-200 text-rose-600",
    };

    const bgColorMap: Record<string, string> = {
        indigo: "bg-indigo-50",
        emerald: "bg-emerald-50",
        blue: "bg-blue-50",
        amber: "bg-amber-50",
        rose: "bg-rose-50",
    };

    return (
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-[0_16px_32px_-12px_rgba(32,30,67,0.04)] hover:shadow-[0_40px_80px_-16px_rgba(32,30,67,0.1)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
            <div className="relative z-10">
                <div className={`w-14 h-14 ${bgColorMap[color]} rounded-2xl flex items-center justify-center text-xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                    <div className={colorMap[color].split(' ')[2]}>
                        {icon}
                    </div>
                </div>
                <div className="space-y-1">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">{title}</h4>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-[#201E43] tracking-tight group-hover:text-indigo-600 transition-colors duration-500">{value}</span>
                    </div>
                    {subtext && <p className="text-[10px] font-bold text-slate-400 italic opacity-60 mt-2">{subtext}</p>}
                </div>
            </div>
            
            {/* Soft background glow */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${colorMap[color].split(' ')[0]} opacity-[0.02] group-hover:opacity-[0.1] rounded-full blur-3xl transition-opacity duration-700`}></div>
        </div>
    );
}