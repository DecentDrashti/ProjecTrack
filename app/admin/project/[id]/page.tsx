import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

async function getProject(id: string) {
  const project = await prisma.projectgroup.findFirst({
    where: {
      ProjectGroupID: Number(id),
    },
    include: {
      projecttype: true,
      projectgroupmember: {
        include: {
          student: true,
        },
      },
    },
  });

  return project;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) return notFound();

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

      <div className="relative z-10 p-8 md:p-10 lg:p-12 max-w-6xl mx-auto mt-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <a href="/admin/project" className="text-[10px] font-black text-[#201E43]/40 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors">Projects</a>
              <span className="text-[#201E43]/20">/</span>
              <span className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Project Details</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#201E43] tracking-tight uppercase leading-tight">
              {project.ProjectTitle}
            </h1>
            <p className="text-[#201E43]/60 font-medium text-lg italic">
              Group: {project.ProjectGroupName}
            </p>
          </div>

          <a
            href="/admin/project"
            className="group flex items-center gap-3 px-8 py-5 bg-white/40 backdrop-blur-md border border-white/60 text-[#201E43] rounded-[2rem] font-black uppercase tracking-[0.15em] text-[11px] hover:bg-[#201E43] hover:text-white hover:scale-105 hover:shadow-2xl transition-all duration-500 shadow-xl shadow-[#201E43]/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            Back to List
          </a>
        </div>

        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">

          {/* Basic Info Card */}
          <div className="bg-white/40 backdrop-blur-[40px] rounded-[2.5rem] p-10 border border-white/60 shadow-2xl shadow-slate-200/50 hover:shadow-slate-300 transition-all duration-500 group">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
              <h2 className="text-[11px] font-black text-[#201E43]/40 uppercase tracking-[0.25em]">
                Overview & Context
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <Info label="Project Type" value={project.projecttype.ProjectTypeName} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>} />
              <StatusBadge status={project.ProjectStatus} />
              <Info label="Research Area" value={project.ProjectArea || "-"} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>} />
            </div>

            {project.ProjectDescription && (
              <div className="mt-12 p-8 rounded-3xl bg-white/30 border border-white/40">
                <p className="text-[10px] font-black text-[#201E43]/30 uppercase tracking-[0.2em] mb-4">
                  Detailed Description
                </p>
                <p className="text-[#201E43]/70 leading-relaxed font-medium text-lg italic">
                  "{project.ProjectDescription}"
                </p>
              </div>
            )}
          </div>

          {/* Ownership */}
          <div className="bg-white/40 backdrop-blur-[40px] rounded-[2.5rem] p-10 border border-white/60 shadow-2xl shadow-slate-200/50 hover:shadow-slate-300 transition-all duration-500">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
              <h2 className="text-[11px] font-black text-[#201E43]/40 uppercase tracking-[0.25em]">
                Mentorship
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-[#201E43] flex items-center justify-center text-white text-xl font-black shadow-lg">
                {project.GuideStaffName?.charAt(0) || "G"}
              </div>
              <div>
                <Info
                  label="Assigned Guide faculty"
                  value={project.GuideStaffName || "Not Assigned"}
                />
              </div>
            </div>
          </div>

          {/* Students */}
          <div className="bg-white/40 backdrop-blur-[40px] rounded-[2.5rem] p-10 border border-white/60 shadow-2xl shadow-slate-200/50 hover:shadow-slate-300 transition-all duration-500">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                <h2 className="text-[11px] font-black text-[#201E43]/40 uppercase tracking-[0.25em]">
                  Development Team
                </h2>
              </div>
              <div className="px-5 py-2 rounded-2xl bg-[#201E43]/5 text-[#201E43] font-black text-xs uppercase tracking-widest border border-[#201E43]/10">
                {project.projectgroupmember.length} Members
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.projectgroupmember.map((member) => (
                <div
                  key={member.ProjectGroupMemberID}
                  className="p-6 rounded-3xl bg-white/30 border border-white/40 hover:bg-white hover:scale-[1.03] hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#201E43] font-black group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                      {member.student.StudentName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-[#201E43] group-hover:text-indigo-600 transition-colors">
                        {member.student.StudentName}
                      </p>
                      <p className="text-[10px] font-bold text-[#201E43]/40 uppercase tracking-widest">
                        {member.student.EnrollmentNo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring */}
          <div className="bg-white/40 backdrop-blur-[40px] rounded-[2.5rem] p-10 border border-white/60 shadow-2xl shadow-slate-200/50 hover:shadow-slate-300 transition-all duration-500">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
              <h2 className="text-[11px] font-black text-[#201E43]/40 uppercase tracking-[0.25em]">
                System Timeline
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <Info
                label="Initial Registry"
                value={
                  project.Created
                    ? new Date(project.Created).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : "-"
                }
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
              />
              <Info
                label="Latest Evolution"
                value={
                  project.Modified
                    ? new Date(project.Modified).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : "-"
                }
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Info({ label, value, icon }: { label: string; value: any; icon?: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon && <span className="text-indigo-500 opacity-50">{icon}</span>}
        <p className="text-[10px] font-black text-[#201E43]/40 uppercase tracking-[0.15em]">
          {label}
        </p>
      </div>
      <p className="text-xl font-black text-[#201E43] tracking-tight">{value}</p>
    </div>
  );
}
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PROPOSED: "bg-slate-100/50 text-slate-600 ring-slate-200",
    APPROVED: "bg-blue-100/50 text-blue-600 ring-blue-200",
    ONGOING: "bg-emerald-100/50 text-emerald-600 ring-emerald-200",
    COMPLETED: "bg-purple-100/50 text-purple-600 ring-purple-200",
    REJECTED: "bg-rose-100/50 text-rose-600 ring-rose-200",
  };

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black text-[#201E43]/40 uppercase tracking-[0.15em]">
        Project Lifecycle
      </p>
      <div className="flex">
        <span
          className={`px-5 py-2 text-[10px] font-black rounded-full uppercase tracking-[0.15em] border backdrop-blur-md shadow-sm ring-1 ${styles[status] || styles.PROPOSED}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}