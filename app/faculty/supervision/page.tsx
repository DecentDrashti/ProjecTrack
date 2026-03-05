import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma"; // Ensure this matches your prisma instance path
import Link from "next/link";
import { redirect } from "next/navigation";

async function getAuthenticatedFaculty() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    
    // Based on your login code, 'id' in the token is the Staff Email
    const email = payload.id as string;

    // Fetch the numeric StaffID from the database using the email
    const staff = await prisma.staff.findUnique({
      where: { Email: email },
      select: { StaffID: true, StaffName: true }
    });

    if (!staff) redirect("/login");
    return staff;
  } catch (error) {
    redirect("/login");
  }
}

export default async function SupervisionsPage() {
  const staff = await getAuthenticatedFaculty();

  // Fetch groups where this staff is involved
  // We check if they are the Convener OR the Expert for the group
  const groups = await prisma.projectgroup.findMany({
    where: {
      OR: [
        { ConvenerStaffID: staff.StaffID },
        { ExpertStaffID: staff.StaffID },
        { GuideStaffName: staff.StaffName } // Fallback to name match
      ]
    },
    include: {
      projectgroupmember: {
        include: {
          student: true
        }
      },
      projecttype: true
    },
    orderBy: {
      Created: "desc",
    },
  });

  const total = groups.length;
  const approved = groups.filter((g) => g.ProjectStatus === "APPROVED").length;
  const ongoing = groups.filter((g) => g.ProjectStatus === "ONGOING").length;

  return (
    <div className="p-6 space-y-8 bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#201E43] tracking-tight">
            Supervision Panel
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Managing {total} assigned project groups
          </p>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Faculty Member</p>
           <p className="text-sm font-bold text-[#201E43]">{staff.StaffName}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Assigned" value={total} color="border-indigo-200" />
        <StatCard title="Approved" value={approved} color="border-emerald-200" />
        <StatCard title="Ongoing" value={ongoing} color="border-blue-200" />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
            <tr>
              <th className="px-6 py-5 text-left">Group & Title</th>
              <th className="px-6 py-5 text-left">Type</th>
              <th className="px-6 py-5 text-left">Team Members</th>
              <th className="px-6 py-5 text-left">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {groups.map((group) => (
              <tr key={group.ProjectGroupID} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-5">
                  <p className="font-black text-[#201E43]">{group.ProjectGroupName}</p>
                  <p className="text-xs text-slate-500 truncate max-w-[200px]">{group.ProjectTitle}</p>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                    {group.projecttype.ProjectTypeName}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex -space-x-2">
                    {group.projectgroupmember.map((m) => (
                      <div 
                        key={m.ProjectGroupMemberID} 
                        title={m.student.StudentName}
                        className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white uppercase"
                      >
                        {m.student.StudentName.charAt(0)}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={group.ProjectStatus} />
                </td>
                <td className="px-6 py-5 text-right">
                  <Link
                    href={`/faculty/supervision/${group.ProjectGroupID}`}
                    className="bg-[#201E43] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter hover:scale-105 transition-transform inline-block shadow-lg shadow-indigo-100"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {groups.length === 0 && (
          <div className="py-20 text-center text-slate-400 font-bold italic">
            No project groups found under your supervision.
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Styled Components --- */

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className={`bg-white p-6 rounded-[2rem] border-b-4 ${color} shadow-sm`}>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</p>
      <p className="text-4xl font-black text-[#201E43] mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PROPOSED: "bg-amber-50 text-amber-600",
    APPROVED: "bg-emerald-50 text-emerald-600",
    ONGOING: "bg-blue-50 text-blue-600",
    COMPLETED: "bg-indigo-50 text-indigo-600",
    REJECTED: "bg-red-50 text-red-600",
  };
  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${styles[status] || styles.PROPOSED}`}>
      {status}
    </span>
  );
}