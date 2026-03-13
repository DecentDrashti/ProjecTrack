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
          <p className="text-slate-500 font-medium tracking-tight">Project Group ID: {membership.ProjectGroupID}</p>
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
        <div className="grid gap-6">
          {tasks.map((task) => {
            const submission = task.projecttasksubmission[0];
            const status = submission ? submission.Status : "PENDING";

            return (
              <div key={task.ProjectTaskID} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="font-black text-xl text-[#201E43]">{task.Title}</h2>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                      status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 
                      status === 'SUBMITTED' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {status}
                    </span>
                  </div>
                  {task.Description && <p className="text-slate-600 text-sm leading-relaxed max-w-xl">{task.Description}</p>}
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Deadline: <span className={new Date(task.Deadline) < new Date() ? 'text-red-500' : 'text-slate-600'}>
                      {new Date(task.Deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {submission ? (
                    <div className="flex flex-col items-end gap-2">
                      <a href={submission.FileUrl} target="_blank" className="bg-slate-50 border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                        View Submission
                      </a>
                    </div>
                  ) : (
                    <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#201E43] transition-all shadow-lg shadow-indigo-100">
                      Upload Task
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}