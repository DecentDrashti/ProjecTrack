import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

// Utility for formatting dates using native Intl (Zero dependencies)
const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

async function getStudentDashboardData() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) redirect("/login");

    let enrollmentNo: string;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);
        enrollmentNo = payload.id as string;
    } catch (error) {
        redirect("/login");
    }

    // 1. Fetch Student Profile & Membership
    const student = await prisma.student.findUnique({
        where: { EnrollmentNo: enrollmentNo },
        include: {
            projectgroupmember: {
                include: {
                    projectgroup: {
                        include: {
                            projectgroupmember: {
                                include: {
                                    student: true
                                }
                            },
                        }
                    }
                }
            }
        }
    });

    if (!student) redirect("/login");

    const membership = student.projectgroupmember?.[0];
    const projectGroup = membership?.projectgroup;
    const studentId = student.StudentID;
    const groupId = projectGroup?.ProjectGroupID;

    // 2. Task Summary
    let totalTasks = 0;
    let completedTasks = 0;
    let upcomingDeadlines: any[] = [];

    if (groupId) {
        totalTasks = await prisma.projecttask.count({
            where: { ProjectGroupID: groupId }
        });

        completedTasks = await prisma.projecttasksubmission.count({
            where: {
                ProjectGroupID: groupId,
                StudentID: studentId,
                Status: "APPROVED"
            }
        });

        // 3. Upcoming Deadlines (next 3 nearest tasks)
        upcomingDeadlines = await prisma.projecttask.findMany({
            where: {
                ProjectGroupID: groupId,
                Deadline: { gte: new Date() }
            },
            include: {
                projecttasksubmission: {
                    where: { StudentID: studentId }
                }
            },
            orderBy: { Deadline: "asc" },
            take: 3
        });
    }

    const pendingTasks = totalTasks - completedTasks;

    // 4. Upcoming Meetings (future only)
    let upcomingMeetings: any[] = [];
    if (groupId) {
        upcomingMeetings = await prisma.projectmeeting.findMany({
            where: {
                ProjectGroupID: groupId,
                MeetingDateTime: { gte: new Date() }
            },
            include: { staff: true },
            orderBy: { MeetingDateTime: "asc" },
            take: 5
        });
    }

    // 5. Announcements (Auto-expiry 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const announcements = await prisma.announcement.findMany({
        where: {
            IsActive: true,
            TargetRole: { in: ["STUDENT", "ALL"] },
            Created: { gte: sevenDaysAgo }
        },
        orderBy: { Created: "desc" },
        take: 5
    });

    return {
        student,
        projectGroup,
        membership,
        taskSummary: { totalTasks, completedTasks, pendingTasks },
        upcomingDeadlines,
        upcomingMeetings,
        announcements
    };
}

export default async function StudentDashboard() {
    const data = await getStudentDashboardData();
    const { student, projectGroup, taskSummary, upcomingDeadlines, upcomingMeetings, announcements } = data;

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-[1600px] mx-auto space-y-8">
                
                {/* 1. Student Info (Top Section) */}
                <header className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black text-[#201E43] tracking-tight">
                            Welcome, <span className="text-indigo-600 font-black">{student.StudentName}</span>
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">
                                Enrollment: {student.EnrollmentNo}
                            </span>
                            {projectGroup && (
                                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 shadow-sm">
                                    {projectGroup.ProjectGroupName}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                        <div className="px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${projectGroup ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></div>
                            <span className="text-sm font-bold text-[#201E43]">
                                {projectGroup ? "Project Status: " + projectGroup.ProjectStatus : "No Project Group Assigned"}
                            </span>
                        </div>
                    </div>
                </header>

                {/* 1.5 Project Brief (Enhanced & Attractive) */}
                {projectGroup ? (
                    <section className="bg-white/40 backdrop-blur-xl border border-white/80 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex flex-col lg:flex-row justify-between gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className="px-4 py-1.5 bg-[#201E43] text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-lg shadow-indigo-900/20">
                                            Active Assignment
                                        </span>
                                        {projectGroup.ProjectArea && (
                                            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full border border-indigo-100 uppercase tracking-widest">
                                                {projectGroup.ProjectArea}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-black text-[#201E43] leading-tight group-hover:text-indigo-600 transition-colors">
                                        {projectGroup.ProjectTitle || "Untitled Strategic Project"}
                                    </h3>
                                    <p className="text-[#7E8491] text-sm mt-3 leading-relaxed max-w-2xl font-medium">
                                        {projectGroup.ProjectDescription || "Researching and developing innovative solutions for the future of technology and academic excellence."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 lg:min-w-[400px]">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Guide Faculty</p>
                                        <div className="flex items-center gap-3 p-3 bg-white/60 border border-slate-100 rounded-2xl shadow-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <p className="font-bold text-[#201E43] text-sm">{projectGroup.GuideStaffName || "Awaiting Guide"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Group Synergy</p>
                                        <div className="flex -space-x-3 mt-1">
                                            {projectGroup.projectgroupmember.map((member, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className="w-11 h-11 rounded-2xl border-4 border-white bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-xs font-black text-indigo-600 shadow-sm hover:z-20 hover:-translate-y-1 transition-all cursor-default"
                                                    title={member.student.StudentName}
                                                >
                                                    {member.student.StudentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                            ))}
                                            <div className="w-11 h-11 rounded-2xl border-4 border-white bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400">
                                                +{projectGroup.projectgroupmember.length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Elegant background highlights */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-700"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                    </section>
                ) : (
                    <div className="bg-amber-50 border border-amber-100 p-10 rounded-[2.5rem] text-center shadow-sm">
                        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-black text-amber-900">Group Assignment Pending</h3>
                        <p className="text-amber-700 mt-2 max-w-sm mx-auto font-medium">You haven't been assigned to a project group yet. Please check with your department or faculty coordinator.</p>
                    </div>
                )}

                {/* 2. Task Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-white hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Tasks</h4>
                                <p className="text-3xl font-black text-[#201E43] mt-0.5">{taskSummary.totalTasks}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-white hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed</h4>
                                <p className="text-3xl font-black text-[#201E43] mt-0.5">{taskSummary.completedTasks}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-white hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending</h4>
                                <p className="text-3xl font-black text-[#201E43] mt-0.5">{taskSummary.pendingTasks}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* 3. Upcoming Deadlines */}
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-[#201E43]">Upcoming Deadlines</h3>
                            <a href="/student/tasks" className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 hover:bg-[#201E43] hover:text-white transition-all shadow-sm group/link" title="Manage All Tasks">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                            </a>
                        </div>
                        <div className="space-y-4">
                            {upcomingDeadlines.length > 0 ? (
                                upcomingDeadlines.map((task) => {
                                    const hasSubmitted = task.projecttasksubmission.length > 0;
                                    const deadlineDate = new Date(task.Deadline);
                                    return (
                                        <a key={task.ProjectTaskID} href="/student/tasks" className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/40 group hover:bg-white transition-all shadow-sm hover:border-indigo-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-[#201E43] border border-slate-100 group-hover:border-indigo-100 transition-colors shadow-sm">
                                                    <span className="text-[10px] font-black uppercase tracking-tight text-indigo-500">{formatDate(deadlineDate, {month: 'short'})}</span>
                                                    <span className="text-lg font-black leading-none">{formatDate(deadlineDate, {day: '2-digit'})}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#201E43] group-hover:text-indigo-600 transition-colors line-clamp-1">{task.Title}</p>
                                                    <p className="text-[10px] text-slate-500 font-medium">Due: {formatDate(deadlineDate, {dateStyle: 'medium'})}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm hidden sm:inline-block ${
                                                    hasSubmitted ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                                }`}>
                                                    {hasSubmitted ? 'Submitted' : 'Pending'}
                                                </span>
                                                <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                            </div>
                                        </a>
                                    );
                                })
                            ) : (
                                <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-xs text-slate-400 font-bold italic">No upcoming tasks found.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 📢 Buzz Section (Official Announcements) */}
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-black text-[#201E43] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#201E43] to-indigo-600">Buzz</h3>
                                <div className="flex gap-1.5 ml-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-[bounce_1s_infinite_0ms]"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-[bounce_1s_infinite_200ms]"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 animate-[bounce_1s_infinite_400ms]"></div>
                                </div>
                            </div>
                            <Link href="/student/announcement" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View All</Link>
                        </div>
                        <div className="space-y-4 relative z-10">
                            {announcements.length > 0 ? (
                                announcements.map((ann) => (
                                    <div key={ann.AnnouncementID} className="p-5 bg-white border border-slate-100 rounded-3xl hover:shadow-md transition-shadow group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-sm font-black text-[#201E43] group-hover:text-indigo-600 transition-colors">{ann.Title}</h4>
                                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border shadow-sm ${
                                                ann.CreatedByRole === 'ADMIN' 
                                                ? 'bg-blue-600 text-white border-blue-600' 
                                                : 'bg-emerald-600 text-white border-emerald-600'
                                            }`}>
                                                {ann.CreatedByRole}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 font-medium">{ann.Message}</p>
                                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-50 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {formatDate(new Date(ann.Created || new Date()), {dateStyle: 'medium', timeStyle: 'short'})}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-xs text-slate-400 font-bold italic">No announcements at this time.</p>
                                </div>
                            )}
                        </div>
                        {/* Subtle Background Blob */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
                    </div>
                </div>

                {/* 4. Upcoming Meetings */}
                <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-[#201E43]">Meeting Schedule</h3>
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase">Upcoming Only</span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">{upcomingMeetings.length} Scheduled</span>
                    </div>
                    <div className="space-y-4">
                        {upcomingMeetings.length > 0 ? (
                            upcomingMeetings.map((meeting) => (
                                <div key={meeting.ProjectMeetingID} className="flex items-center gap-6 p-5 bg-white/40 rounded-3xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all group shadow-sm">
                                    <div className="w-14 h-14 rounded-2xl bg-[#201E43] flex flex-col items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                                        <span className="text-[10px] font-black uppercase text-indigo-300">{formatDate(new Date(meeting.MeetingDateTime), {month: 'short'})}</span>
                                        <span className="text-xl font-black leading-none">{formatDate(new Date(meeting.MeetingDateTime), {day: '2-digit'})}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{meeting.MeetingStatus || "SCHEDULED"}</span>
                                            <span className="text-slate-200">|</span>
                                            <span className="text-[10px] font-bold text-slate-400">{formatDate(new Date(meeting.MeetingDateTime), {timeStyle: 'short'})}</span>
                                        </div>
                                        <p className="text-base font-black text-[#201E43] truncate group-hover:text-indigo-600 transition-colors">
                                            {meeting.MeetingPurpose || "General Project Review"}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {meeting.MeetingLocation || "Faculty Cabin"}
                                            </p>
                                            <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                {meeting.staff.StaffName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <button className="px-4 py-2 bg-slate-50 text-[#201E43] text-[10px] font-black uppercase rounded-xl border border-slate-100 group-hover:bg-[#201E43] group-hover:text-white transition-all">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-slate-50/30 rounded-3xl border border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-200">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <p className="text-sm font-bold text-slate-400 italic">No future meetings scheduled for your group.</p>
                            </div>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}
