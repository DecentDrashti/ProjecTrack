import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TasksPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let enrollmentNo: string;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    // Based on your console log, payload.id is "21CE078"
    enrollmentNo = payload.id as string;
  } catch (error) {
    redirect("/login");
  }

  // STEP 1: Find the internal StudentID (Integer) from the student table
  const studentProfile = await prisma.student.findUnique({
    where: { EnrollmentNo: enrollmentNo },
    select: { StudentID: true }
  });

  if (!studentProfile) {
    return <div className="p-10 text-center text-red-500 font-bold">Student Profile not found.</div>;
  }

  const numericStudentId = studentProfile.StudentID;

  // STEP 2: Find the group this student belongs to using the numeric ID
  const membership = await prisma.projectgroupmember.findFirst({
    where: {
      StudentID: numericStudentId,
    },
    select: {
      ProjectGroupID: true,
    },
  });

  if (!membership) {
    return (
      <div className="p-10 text-center">
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl inline-block font-medium">
          You (Enrollment: {enrollmentNo}) are not assigned to any project group.
        </div>
      </div>
    );
  }

  // STEP 3: Fetch tasks for the group and include this student's specific submissions
  const tasks = await prisma.projecttask.findMany({
    where: {
      ProjectGroupID: membership.ProjectGroupID,
    },
    include: {
      projecttasksubmission: {
        where: {
          StudentID: numericStudentId,
        },
      },
    },
    orderBy: {
      Deadline: "asc",
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#201E43]">Group Tasks</h1>
          {/* <p className="text-slate-500 font-medium tracking-tight">Project Group ID: {membership.ProjectGroupID}</p> */}
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tasks</span>
          <p className="text-2xl font-black text-indigo-600">{tasks.length}</p>
        </div>
      </header>

      {tasks.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center">
          <p className="text-slate-400 font-bold italic">No tasks assigned yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {tasks.map((task) => {
            const submission = task.projecttasksubmission[0];
            const status = submission ? submission.Status : "PENDING";

            return (
              <div key={task.ProjectTaskID} className="group bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col w-full flex-1">
                  {/* Top Section */}
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <h2 className="font-extrabold text-2xl text-[#201E43] leading-tight flex-1">{task.Title}</h2>
                    <span className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shrink-0 shadow-sm border ${
                      status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      status === 'SUBMITTED' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {status}
                    </span>
                  </div>

                  {/* Middle Section */}
                  <div className="space-y-6 flex-1 flex flex-col justify-start w-full">
                    {task.Description && (
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{task.Description}</p>
                    )}
                    
                    <div className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 w-fit">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Deadline: <span className={new Date(task.Deadline) < new Date() ? 'text-rose-500 font-black ml-1' : 'text-slate-700 font-black ml-1'}>
                          {new Date(task.Deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 w-full pt-6 mt-8 border-t border-slate-100 flex justify-end">
                  <div className="flex items-center gap-3">
                    {submission ? (
                      <a href={submission.FileUrl} target="_blank" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:border-slate-300 hover:bg-slate-50 transition-all hover:shadow-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Submission
                      </a>
                    ) : (
                      <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg shadow-indigo-600/20">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Task
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}