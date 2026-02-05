import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "@/app/lib/prisma";

async function getMyProject() {
  // FIX: cookies() is now an async function in newer Next.js versions
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  try {
    // 1. Get the EnrollmentNo from the JWT payload
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const enrollmentNo = payload.id as string;

    // 2. Fetch the Project data
    // Note: Double check your Prisma model names (e.g., projectGroupMember vs ProjectGroupMember)
    const studentData = await prisma.student.findFirst({
      where: { EnrollmentNo: enrollmentNo },
      include: {
        projectgroupmember: {
          include: {
            projectgroup: {
              include: {
                projecttype: true,
              }
            }
          }
        }
      }
    });

    // Extract the first project group the student belongs to
    return studentData?.projectgroupmember[0]?.projectgroup || null;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    redirect("/login");
  }
}

export default async function ProjectsPage() {
  const project = await getMyProject();

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-10 mt-20 text-center bg-white rounded-[2.5rem] shadow-sm mx-10 border border-slate-100">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#201E43]">No Project Assigned</h2>
        <p className="text-slate-500 mt-2 max-w-sm">
            It looks like you aren't part of any project group yet. 
            Please coordinate with your faculty guide or department head.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 mt-16 max-w-6xl mx-auto animate-in fade-in duration-700">
      {/* Project Status Banner */}
      <div className="bg-[#201E43] text-white p-10 rounded-[3rem] shadow-xl mb-8 relative overflow-hidden group">
        <div className="relative z-10">
          <span className="bg-indigo-500/30 text-indigo-100 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase backdrop-blur-md">
            {project.projecttype?.ProjectTypeName || "General Project"}
          </span>
          <h1 className="text-4xl font-black mt-6 mb-3 tracking-tight leading-tight uppercase">
            {project.ProjectTitle}
          </h1>
          <div className="flex items-center gap-2 text-indigo-200/80 font-medium">
            <span className="w-4 h-4 bg-indigo-400/30 rounded-full flex items-center justify-center text-[10px]">#</span>
            {project.ProjectArea}
          </div>
        </div>
        
        {/* Animated Background Element */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Details Column */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Abstract & Objectives</h3>
            <p className="text-slate-600 leading-relaxed text-lg font-medium italic">
              "{project.ProjectDescription}"
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-[#201E43] font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Mentorship
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assigned Guide</p>
                <p className="text-md font-bold text-[#201E43]">{project.GuideStaffName}</p>
              </div>
              <div className="pt-6 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Project Status</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-sm font-black text-emerald-600 uppercase tracking-tight">{project.ProjectStatus}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/50">
            <p className="text-xs text-indigo-600 font-semibold leading-relaxed">
                Need to update your project details? Please submit a request via the help desk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function StudentProjectsPage() {
//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">My Projects</h1>
//             <div className="bg-white rounded-lg shadow p-6">
//                 <h2 className="text-xl font-semibold mb-2">Project Title</h2>
//                 <p className="text-gray-700 mb-4">Brief description of the project goes here. It can include the technologies used, the purpose of the project, and any other relevant details.</p>
//                 <a href="#" className="text-blue-500 hover:underline">View Project Details</a>
//             </div>
//         </div>
//     );
// }
//import { users } from '@/lib/generated/prisma/browser'; 
// import { prisma } from '@/app/lib/prisma'; 
// import React from 'react' 
// import {}
 
// async function StudentList() { 
//     const data = await prisma.staff.findMany(); 
//      console.log(data);
//   return ( 
//     <table className="min-w-full border border-gray-300 text-left">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="px-4 py-2 border-b">Student ID</th>
//           <th className="px-4 py-2 border-b">Name</th>
//           <th className="px-4 py-2 border-b">Email</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((u: staff) => (
//           <tr key={u.StaffID} className="hover:bg-gray-50">
//             <td className="px-4 py-2 border-b">{u.StaffID}</td>
//             <td className="px-4 py-2 border-b">{u.StaffName}</td>
//             <td className="px-4 py-2 border-b">{u.Email}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
// //     <div>  
// //         <ul> 
// //       {data.map((u: student) => (
// //     <li key={u.StudentID}>
// //       <div>{u.StudentName}</div>
// //       <div>{u.Email}</div>
// //     </li>
// //       ))}
// //       </ul> 
// //     </div>
// //   );
// // }
// export default async function Page() { 
//   return ( 
//     <div> 
//       <h1>Student List</h1> 
//       <StudentList/> 
//     </div> 
//   ); 
// }