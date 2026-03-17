import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PerformancePage() {
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

  // 1. Get Student Profile
  const studentProfile = await prisma.student.findUnique({
    where: { EnrollmentNo: enrollmentNo },
    select: { StudentID: true }
  });

  if (!studentProfile) {
    return <div className="p-10 text-center text-red-500 font-bold">Student Profile not found.</div>;
  }

  const numericStudentId = studentProfile.StudentID;

  // 2. Get Group and Assigned Faculty
  const membership = await prisma.projectgroupmember.findFirst({
    where: { StudentID: numericStudentId },
    include: {
      projectgroup: {
        include: {
          staff_projectgroup_ConvenerStaffIDTostaff: {
            select: { StaffName: true, role: true }
          }
        }
      }
    }
  });

  if (!membership || !membership.projectgroup) {
    return (
      <div className="p-10 text-center">
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl inline-block font-medium">
          You are not assigned to a project group.
        </div>
      </div>
    );
  }

  const group = membership.projectgroup;
  const groupId = group.ProjectGroupID;

  // 3. Logic to show Faculty Name (not Admin)
  const displayFacultyName = group.staff_projectgroup_ConvenerStaffIDTostaff?.role === 'faculty'
    ? group.staff_projectgroup_ConvenerStaffIDTostaff.StaffName
    : group.GuideStaffName || "Assigned Faculty";

  // 4. Fetch All Stats
  const [totalTasks, submittedTasks, reviews, totalMeetings, attendedMeetings] = await Promise.all([
    prisma.projecttask.count({ where: { ProjectGroupID: groupId } }),
    prisma.projecttasksubmission.count({ 
      where: { ProjectGroupID: groupId, StudentID: numericStudentId } 
    }),
    prisma.projectreview.findMany({
      where: { ProjectGroupID: groupId },
      orderBy: { ReviewDate: 'desc' }
    }),
    prisma.projectmeeting.count({ where: { ProjectGroupID: groupId } }),
    prisma.projectmeetingattendance.count({
      where: { 
        StudentID: numericStudentId, 
        IsPresent: true,
        projectmeeting: { ProjectGroupID: groupId }
      }
    })
  ]);

  const pendingTasks = totalTasks - submittedTasks;
  const latestProgress = reviews.length > 0 ? (reviews[0].ProgressPercent || 0) : 0;
  const attendancePercent = totalMeetings > 0 ? Math.round((attendedMeetings / totalMeetings) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#201E43]">Performance Dashboard</h1>
          <p className="text-slate-500 font-bold mt-1">{group.ProjectTitle}</p>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Total Tasks</span>
          <span className="text-4xl font-black text-[#201E43]">{totalTasks}</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Completed</span>
          <span className="text-4xl font-black text-emerald-500">{submittedTasks}</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Pending</span>
          <span className="text-4xl font-black text-rose-500">{pendingTasks}</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Meetings</span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-indigo-600">{attendedMeetings}</span>
            <span className="text-xl font-bold text-slate-400">/ {totalMeetings}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Progress & Attendance */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Progress Section */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#201E43] mb-6">Group Progress</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Latest Review</span>
                <span className="text-3xl font-black text-indigo-600">{latestProgress}%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${latestProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Meeting Attendance Section (RESTORED) */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#201E43] mb-6">Meeting Attendance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Rate</span>
                <span className={`text-3xl font-black ${attendancePercent >= 75 ? 'text-emerald-500' : attendancePercent >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                  {attendancePercent}%
                </span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${attendancePercent >= 75 ? 'bg-emerald-500' : attendancePercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  style={{ width: `${attendancePercent}%` }}
                ></div>
              </div>
              <p className="text-sm font-medium text-slate-500 text-center pt-4">
                You attended {attendedMeetings} out of {totalMeetings} meetings.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Faculty Reviews */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm h-full">
            <h2 className="text-lg font-bold text-[#201E43] mb-6">Recent Faculty Reviews</h2>
            
            {reviews.length === 0 ? (
              <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-[1.5rem]">
                <p className="text-slate-400 font-bold italic">No reviews recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.ReviewID} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div>
                        {/* Using the logic-derived Faculty Name here */}
                        <h3 className="font-bold text-slate-800">{displayFacultyName}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {review.ReviewDate ? new Date(review.ReviewDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Unknown Date'}
                        </span>
                      </div>
                      <span className="text-lg font-black text-indigo-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 shrink-0">
                        {review.ProgressPercent || 0}%
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {review.ProgressSummary && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Summary</p>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed">{review.ProgressSummary}</p>
                        </div>
                      )}
                      
                      {review.Remark && (
                        <div className="pt-3 border-t border-slate-200/60">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Faculty Remark</p>
                          <p className="text-sm font-semibold italic text-slate-600 leading-relaxed">"{review.Remark}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}