import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

// Fetch project with reviews
async function getProjectReviews(id: number) {
  if (!id || isNaN(id)) return null;

  const project = await prisma.projectgroup.findUnique({
    where: {
      ProjectGroupID: id,
    },
    include: {
      projectgroupmember: {
        include: {
          student: true,
        },
      },
      projectreview: {
        orderBy: {
          ReviewDate: "desc",
        },
      },
    },
  });

  return project;
}

export default async function ReviewDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = await getProjectReviews(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-6 space-y-10">

        {/* Header Section */}
        <div className="flex justify-between items-end border-b border-slate-200 pb-8">
          <div>
            <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              <span>/</span>
              <span className="text-slate-600">Review History</span>
            </nav>

            <h1 className="text-4xl font-black text-[#201E43] tracking-tighter">
              {project.ProjectTitle}
            </h1>

            <p className="text-slate-500 font-bold mt-2 italic">
              Group: {project.ProjectGroupName}
            </p>
          </div>

          <Link
            href="/faculty/review"
            className="px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Sidebar: Students */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">
              Development Team
            </h3>

            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 space-y-4">
              {project.projectgroupmember.map((member) => (
                <div
                  key={member.ProjectGroupMemberID}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-xs">
                    {member.student.StudentName.charAt(0)}
                  </div>

                  <div>
                    <p className="font-black text-[#201E43] text-sm leading-none mb-1">
                      {member.student.StudentName}
                    </p>

                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {member.student.EnrollmentNo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Timeline */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Project Progress Timeline
              </h3>
              <Link
                href={`/faculty/review/${project.ProjectGroupID}/add`}
                className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 hover:shadow-xl hover:shadow-indigo-200 transition-all duration-500 group shadow-lg shadow-indigo-100"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                Add Review
              </Link>
            </div>

            {project.projectreview.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold italic">
                  No reviews have been submitted yet.
                </p>
              </div>
            ) : (
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-slate-200 before:to-transparent">

                {project.projectreview.map((review) => (
                  <div key={review.ReviewID} className="relative pl-12 group">

                    {/* Timeline Node */}
                    <div className="absolute left-0 w-10 h-10 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 shadow-md shadow-slate-200/50 border border-slate-100 hover:border-indigo-100 transition-colors">

                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

                        <div>
                          <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">
                            {review.ReviewDate
                              ? new Date(review.ReviewDate).toLocaleDateString(
                                  "en-GB",
                                  { day: "2-digit", month: "short", year: "numeric" }
                                )
                              : "TBD"}
                          </p>

                          <h4 className="font-black text-[#201E43] text-lg leading-tight">
                            Bi-Weekly Review Session
                          </h4>
                        </div>

                        <div className="bg-slate-50 px-5 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[100px]">
                          <span className="text-[10px] font-black text-slate-400 uppercase">
                            Progress
                          </span>

                          <span className="text-xl font-black text-indigo-600">
                            {review.ProgressPercent ?? 0}%
                          </span>
                        </div>

                      </div>

                      <div className="space-y-6">

                        <div>
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">
                            Progress Summary
                          </p>

                          <p className="text-slate-600 font-medium leading-relaxed">
                            {review.ProgressSummary ??
                              "No summary provided for this review."}
                          </p>
                        </div>

                        {review.Remark && (
                          <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">
                              Faculty Remarks
                            </p>

                            <p className="text-sm text-indigo-900 font-bold italic">
                              "{review.Remark}"
                            </p>
                          </div>
                        )}

                      </div>
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