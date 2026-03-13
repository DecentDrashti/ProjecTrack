import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

async function getReviews() {
  const reviews = await prisma.projectreview.findMany({
  distinct: ["ProjectGroupID"],

  orderBy: [
    { ProjectGroupID: "asc" },
    { ReviewDate: "desc" }
  ],

  include: {
    projectgroup: {
      include: {
        projectgroupmember: true
      }
    }
  }
});

  return reviews;
}

export default async function ReviewPage() {
  const reviews = await getReviews();

  return (
    <div className="min-h-screen relative overflow-hidden font-sans pb-20">
      {/* Background Blobs - matching the "liquid glass" theme */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none" style={{ filter: 'url(#goo)' }}>
        <div className="absolute top-[5%] left-[10%] w-[30%] h-[30%] bg-[#201E43]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] right-[20%] w-[20%] h-[20%] bg-blue-200/30 rounded-full blur-3xl animate-ping opacity-20"></div>
      </div>

      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 p-6 md:p-10 lg:p-12 max-w-7xl mx-auto mt-16">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-[#201E43] tracking-tight mb-2 uppercase">Project Reviews</h1>
            <p className="text-[#201E43]/60 font-medium whitespace-nowrap">Track and evaluate project progress and milestones</p>
          </div>
        </div>

        {/* Table Layout */}
        <div className="relative group">
          {/* Decorative element for glassmorphism */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative bg-white/40 backdrop-blur-[30px] rounded-[2.5rem] border border-white/60 shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#201E43]/15 border-b border-white/40">
                    <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Project Title</th>
                    <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Group Name</th>
                    <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Review Date</th>
                    <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Progress</th>
                    <th className="px-8 py-6 text-right"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/20">
                  {reviews.map((review) => (
                    <tr
                      key={review.ReviewID}
                      className="hover:bg-white/40 transition-all duration-300 group/row"
                    >
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-[#201E43] group-hover/row:translate-x-1 transition-transform duration-300 block">
                          {review.projectgroup?.ProjectTitle}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-slate-600 bg-white/60 px-3 py-1.5 rounded-xl border border-white/80 shadow-sm">
                          {review.projectgroup?.ProjectGroupName}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-[#201E43]/60 tabular-nums">
                          {review.ReviewDate?.toLocaleDateString()}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4 min-w-[160px]">
                          {/* Range-slider style progress indicator */}
                          <div className="relative w-32 h-2.5 bg-slate-200/50 rounded-full overflow-hidden border border-white/40 backdrop-blur-sm">
                            <div
                              className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-all duration-500"
                              style={{ width: `${review.ProgressPercent || 0}%` }}
                            ></div>
                            {/* Visual "thumb" indicator to make it look like a slider */}
                            <div
                              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-md z-10 transition-all duration-500"
                              style={{ left: `calc(${review.ProgressPercent || 0}% - 8px)` }}
                            ></div>
                          </div>
                          <span className="text-xs font-black text-[#201E43] tabular-nums">
                            {review.ProgressPercent || 0}%
                          </span>
                        </div>
                      </td>

                      <td className="px-8 py-6 text-right">
                        <Link
                          href={`/faculty/review/${review.ProjectGroupID}`}
                          className="bg-[#201E43] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:scale-105 transition-transform inline-block shadow-lg shadow-[#201E43]/20"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {reviews.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-8 py-32 text-center"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-20 h-20 bg-white/40 rounded-3xl flex items-center justify-center border border-white/60 shadow-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#201E43" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          </div>
                          <h3 className="text-xl font-black text-[#201E43] tracking-tight">No Reviews Found</h3>
                          <p className="text-[#201E43]/40 font-bold italic">"There are no project reviews tracked in the system yet."</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
