import { prisma } from "@/app/lib/prisma";
import Link from "next/dist/client/link";

export default async function StudentList() {
    const students = await prisma.student.findMany();

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

            <div className="relative z-10 p-6 md:p-10 lg:p-12">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-[#201E43] tracking-tight mb-2">Students</h1>
                        <p className="text-[#201E43]/60 font-medium">Manage and view all registered students</p>
                    </div>

                    <Link href="/admin/students/add" className="flex items-center gap-2 px-6 py-4 bg-[#201E43] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all duration-300 shadow-xl shadow-[#201E43]/20 group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Student
                    </Link>
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
                                        <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Enrollment No</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Student Name</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Email Address</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Phone</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">Description</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/20">
                                    {students.length > 0 ? (
                                        students.map((student) => (
                                            <tr key={student.StudentID} className="hover:bg-white/40 transition-all duration-300 group/row">
                                                <td className="px-8 py-6">
                                                    <span className="text-xs font-black text-[#201E43] bg-white/60 px-3 py-1.5 rounded-xl border border-white/80 whitespace-nowrap shadow-sm">
                                                        {student.EnrollmentNo}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        {/* <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#201E43] to-[#4338ca] flex items-center justify-center text-white text-sm font-black ring-4 ring-white/40 flex-shrink-0 shadow-lg group-hover/row:scale-110 transition-transform duration-500">
                                                            {student.StudentName?.charAt(0) || 'S'}
                                                        </div> */}
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-black text-[#201E43] group-hover/row:translate-x-1 transition-transform duration-300">{student.StudentName}</span>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm font-bold text-[#201E43]/70">{student.Email}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm font-bold text-[#201E43]/40 tabular-nums">{student.Phone}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 text-emerald-600 text-[9px] font-black uppercase tracking-widest shadow-sm ring-1 ring-emerald-200 backdrop-blur-sm">
                                                        {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        In Progress */} {student.Description || "N/A"}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-center gap-2.5">
                                                        <button className="p-3 rounded-2xl bg-white/60 text-[#201E43]/70 hover:bg-[#201E43] hover:text-white transition-all duration-300 border border-white/80 shadow-sm hover:shadow-indigo-200 hover:-translate-y-0.5" title="View Details">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </button>
                                                        <button className="p-3 rounded-2xl bg-white/60 text-amber-600/70 hover:bg-amber-500 hover:text-white transition-all duration-300 border border-white/80 shadow-sm hover:shadow-amber-200 hover:-translate-y-0.5" title="Edit Student">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
                                                        </button>
                                                        <button className="p-3 rounded-2xl bg-white/60 text-rose-600/70 hover:bg-rose-500 hover:text-white transition-all duration-300 border border-white/80 shadow-sm hover:shadow-rose-200 hover:-translate-y-0.5" title="Remove Student">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-32 text-center">
                                                <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
                                                    <div className="w-28 h-28 bg-white/40 rounded-[2rem] flex items-center justify-center border border-white/60 shadow-xl relative group-hover:scale-105 transition-transform duration-500">
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#201E43]/5 to-indigo-500/5 rounded-[2rem]"></div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#201E43" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20 relative z-10"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-black text-[#201E43] tracking-tight mb-2">No Students Registered</h3>
                                                        <p className="text-[#201E43]/40 font-bold max-w-sm mx-auto leading-relaxed italic">"Every project starts with a student. It seems we're waiting for our first one."</p>
                                                    </div>
                                                    <button className="px-8 py-3.5 bg-[#201E43] text-white rounded-2xl font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all duration-300 shadow-xl shadow-[#201E43]/20">
                                                        Onboard First Student
                                                    </button>
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

            {/* <style jsx global>{`
                @keyframes pulse-once {
                    0% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.05); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 0.3; }
                }
                .animate-pulse {
                    animation: pulse-once 10s ease-in-out infinite;
                }
            `}</style> */}
        </div>
    );
}
