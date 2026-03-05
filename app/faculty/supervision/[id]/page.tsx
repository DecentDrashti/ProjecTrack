import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

async function getAuthenticatedStaff() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const staff = await prisma.staff.findUnique({
      where: { Email: payload.id as string },
      select: { StaffID: true, StaffName: true }
    });
    return staff;
  } catch {
    redirect("/login");
  }
}

export default async function SupervisionDetailPage({ params }: Props) {
  const { id } = await params;
  const staff = await getAuthenticatedStaff();

  const group = await prisma.projectgroup.findFirst({
    where: {
      ProjectGroupID: parseInt(id),
      OR: [
        { ConvenerStaffID: staff?.StaffID },
        { ExpertStaffID: staff?.StaffID },
        { GuideStaffName: staff?.StaffName }
      ]
    },
    include: {
      projectgroupmember: {
        include: { student: true },
      },
      projecttype: true,
    },
  });

  if (!group) notFound();

  return (
    // Main Wrapper: Centered and full-width compatible
    <div className="min-h-screen bg-[#F8FAFC] w-full pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header - Stretches across the full top width */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 gap-6">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <Link href="/faculty/supervision" className="group p-3 bg-slate-100 hover:bg-[#201E43] rounded-2xl transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-500 group-hover:text-white transition-colors"><path d="m15 18-6-6 6-6"/></svg>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">
                   {group.ProjectGroupName}
                </span>
                {/* <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  ID: #{group.ProjectGroupID}
                </span> */}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-[#201E43] tracking-tight">
                {group.ProjectTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <StatusBadge status={group.ProjectStatus} />
            <button className="px-8 py-4 bg-[#201E43] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:-translate-y-1 transition-all">
               Update Group Status
            </button>
          </div>
        </div>

        {/* Main Content Grid: Balanced 2/3 and 1/3 split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Project Description & Info (Spans 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 min-h-[400px]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-6 bg-[#201E43] rounded-full"></div>
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Project Brief & Objectives</h2>
              </div>
              
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                {group.ProjectDescription || "No detailed description provided."}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-10 border-t border-slate-50">
                <InfoBox label="Project Area" value={group.ProjectArea || "N/A"} />
                <InfoBox label="Project Type" value={group.projecttype.ProjectTypeName} />
                <InfoBox label="Avg CPI" value={group.AverageCPI?.toString() || "0.0"} />
                <InfoBox label="Submission" value={group.Created?.toLocaleDateString() || "TBD"} />
              </div>
            </div>

            {/* Note Section */}
            <div className="bg-indigo-50/50 rounded-[2.5rem] p-8 border border-indigo-100">
               <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Staff Remarks</h3>
               <p className="text-slate-600 font-bold italic text-sm">
                 {group.Description || "Add internal faculty notes about this group's progress here."}
               </p>
            </div>
          </div>

          {/* RIGHT SIDE: Team & Actions (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Team Card */}
            <div className="bg-[#201E43] rounded-[3rem] p-8 text-white shadow-2xl shadow-indigo-200">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-8 flex justify-between">
                <span>Team Members</span>
                <span>{group.projectgroupmember.length} Total</span>
              </h2>
              <div className="space-y-6">
                {group.projectgroupmember.map((member) => (
                  <div key={member.ProjectGroupMemberID} className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center font-black text-xl text-indigo-300 border border-indigo-500/30">
                      {member.student.StudentName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-sm tracking-tight flex items-center gap-2">
                        {member.student.StudentName}
                        {member.IsGroupLeader && (
                          <span className="text-[7px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-black uppercase">Lead</span>
                        )}
                      </p>
                      <p className="text-indigo-200/50 text-[10px] font-bold tracking-widest">{member.student.EnrollmentNo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Guidance Tools</p>
               <div className="space-y-3">
                  <ActionButton label="Schedule Meeting" />
                  <ActionButton label="Review Attendance" variant="secondary" />
                  <ActionButton label="Grade Group" variant="secondary" />
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* --- Refined UI Components --- */

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-sm font-black text-[#201E43]">{value}</p>
    </div>
  );
}

function ActionButton({ label, variant = 'primary' }: { label: string, variant?: 'primary' | 'secondary' }) {
    const styles = variant === 'primary' 
        ? "bg-[#201E43] text-white shadow-lg shadow-indigo-100" 
        : "bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100";
    
    return (
        <button className={`w-full py-4 px-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${styles}`}>
            {label}
        </button>
    )
}

function StatusBadge({ status }: { status?: string }) {
  const colors: Record<string, string> = {
    PROPOSED: "bg-amber-100 text-amber-700",
    APPROVED: "bg-emerald-100 text-emerald-700",
    ONGOING: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-indigo-100 text-indigo-700",
    REJECTED: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-transparent shadow-sm ${colors[status || ""] || "bg-slate-100"}`}>
      {status}
    </span>
  );
}