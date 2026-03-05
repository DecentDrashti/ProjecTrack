import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

async function getAllProjects() {
  const projects = await prisma.projectgroup.findMany({
    include: {
      projectgroupmember: true, // For student count
    },
    orderBy: {
      Created: "desc", // Correct field name
    },
  });

  return projects;
}

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen relative overflow-hidden font-sans pb-20">
      {/* Background Blobs - matching the "liquid glass" theme */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none" style={{ filter: 'url(#goo)' }}>
        <div className="absolute top-[5%] left-[10%] w-[35%] h-[35%] bg-[#201E43]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[45%] h-[45%] bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] right-[20%] w-[25%] h-[25%] bg-blue-200/30 rounded-full blur-3xl animate-ping opacity-20"></div>
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

      <div className="relative z-10 p-8 md:p-10 lg:p-12 max-w-7xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-[#201E43] tracking-tight mb-2 uppercase">
              Project Management
            </h1>
            <p className="text-[#201E43]/60 font-medium text-lg">Monitor and oversee all academic project groups</p>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-[40px] rounded-[2.5rem] border border-white/60 shadow-2xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-[#201E43]/5 border-b border-white/40">
                <tr>
                  <th className="px-8 py-6 text-[11px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">
                    Project Title
                  </th>
                  <th className="px-8 py-6 text-[11px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">
                    Guide
                  </th>
                  <th className="px-8 py-6 text-[11px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] text-center">
                    Students
                  </th>
                  <th className="px-8 py-6 text-[11px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">
                    Created Date
                  </th>
                  <th className="px-8 py-6 text-[11px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">
                    Status
                  </th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/20">
                {projects.map((project) => (
                  <tr
                    key={project.ProjectGroupID}
                    className="group hover:bg-slate-50/50 transition-all duration-300"
                  >
                    <td className="px-8 py-6">
                      <div className="text-lg font-black text-[#201E43] group-hover:text-indigo-600 transition-colors duration-300">
                        {project.ProjectTitle}
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        {/* <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#201E43] border border-indigo-100 font-bold text-xs uppercase">
                          {project.GuideStaffName?.charAt(0) || "N"}
                        </div> */}
                        <span className="text-slate-600 font-semibold italic">
                          {project.GuideStaffName || "Not Assigned"}
                        </span>
                      </div>
                    </td>

                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white/60 border border-white text-[#201E43] font-black text-sm shadow-sm group-hover:scale-110 transition-transform duration-500">
                        {project.projectgroupmember.length}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-slate-500 font-medium">
                      {project.Created
                        ? new Date(project.Created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : "-"}
                    </td>

                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] backdrop-blur-md shadow-sm ring-1 ${project.ProjectStatus === 'PROPOSED' ? 'bg-slate-100/50 text-slate-600 ring-slate-200' :
                        project.ProjectStatus === 'APPROVED' ? 'bg-blue-100/50 text-blue-600 ring-blue-200' :
                          project.ProjectStatus === 'ONGOING' ? 'bg-emerald-100/50 text-emerald-600 ring-emerald-200' :
                            project.ProjectStatus === 'COMPLETED' ? 'bg-purple-100/50 text-purple-600 ring-purple-200' :
                              project.ProjectStatus === 'REJECTED' ? 'bg-rose-100/50 text-rose-600 ring-rose-200' :
                                'bg-slate-100/50 text-slate-600 ring-slate-200'
                        }`}>
                        {project.ProjectStatus}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <Link
                        href={`/admin/project/${project.ProjectGroupID}`}
                        className="inline-flex items-center gap-2 bg-[#201E43]/5 text-[#201E43] py-2.5 px-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-[#201E43] hover:text-white hover:shadow-lg hover:shadow-[#201E43]/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-[#201E43]/10 group/view-btn"
                      >
                        <span>View Details</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover/view-btn:translate-x-1 transition-transform duration-300"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}

                {projects.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-8 py-20">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center border border-white mb-6 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#201E43]/5 to-transparent"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#201E43" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20 relative z-10">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-black text-[#201E43] tracking-tight mb-2">No projects found.</h3>
                        <p className="text-[#201E43]/40 font-bold italic truncate max-w-xs">"The empty space is where greatness begins."</p>
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
  );
}