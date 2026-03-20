import { prisma } from "@/app/lib/prisma";
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function FacultyAnnouncement() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return <div className="p-20 text-center font-black">Unauthorized session</div>;

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const email = decoded.id; // Faculty email

    const faculty = await prisma.staff.findFirst({
        where: { Email: email }
    });

    if (!faculty) return <div className="p-20 text-center font-black">Faculty record not found</div>;

    // Auto-expiry Logic: 7 Days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const announcements = await prisma.announcement.findMany({
        where: {
            CreatedByRole: 'FACULTY',
            IsActive: true,
            Created: {
                gte: sevenDaysAgo
            }
        },
        orderBy: {
            Created: 'desc'
        }
    });

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-20 bg-[#EDF0F5]">
             {/* Background Blobs */}
             <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none" style={{ filter: 'url(#goo)' }}>
                <div className="absolute top-[5%] left-[10%] w-[35%] h-[35%] bg-[#201E43]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[45%] h-[45%] bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
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

            <div className="relative z-10 p-6 md:p-10 lg:p-12 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <h1 className="text-5xl font-black text-[#201E43] tracking-tighter uppercase mb-2">My Broadcasts</h1>
                        <p className="text-[#201E43]/60 font-bold text-lg">Manage your updates for students and syncs</p>
                    </div>

                    <Link href="/faculty/announcement/add" className="flex items-center gap-3 px-8 py-5 bg-[#201E43] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-xl shadow-[#201E43]/10 group">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-90 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </div>
                        Push New Update
                    </Link>
                </div>

                <div className="flex flex-col gap-8">
                    {announcements.length > 0 ? (
                        announcements.map((a) => (
                            <div key={a.AnnouncementID} className="group relative transition-all duration-500 hover:-translate-y-2">
                                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>

                                <div className="relative bg-white/40 backdrop-blur-[40px] rounded-[2.5rem] border border-white/60 shadow-2xl shadow-slate-200/50 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-4 mb-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] backdrop-blur-md shadow-sm ring-1 ${
                                                a.TargetRole === 'ALL' ? 'bg-indigo-100/50 text-indigo-600 ring-indigo-200' :
                                                a.TargetRole === 'STUDENT' ? 'bg-emerald-100/50 text-emerald-600 ring-emerald-200' :
                                                'bg-blue-100/50 text-blue-600 ring-blue-200'
                                            }`}>
                                                {a.TargetRole}
                                            </span>
                                            <span className="text-[10px] font-bold text-[#201E43]/40 uppercase tracking-widest leading-none">
                                                {a.Created ? new Date(a.Created).toLocaleDateString() : 'Now'}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-black text-[#201E43] tracking-tighter mb-3 group-hover:text-indigo-600 transition-colors uppercase">
                                            {a.Title}
                                        </h2>
                                        <p className="text-[#201E43]/70 leading-relaxed font-bold text-lg italic max-w-3xl">
                                            "{a.Message}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Link 
                                            href={`/faculty/announcement/edit/${a.AnnouncementID}`}
                                            className="p-4 rounded-2xl bg-white/60 text-[#201E43]/70 hover:bg-[#201E43] hover:text-white transition-all shadow-sm border border-white/80"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                                <path d="m15 5 4 4"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white/30 border-4 border-dashed border-white/60 rounded-[3.5rem] p-24 text-center">
                            <h3 className="text-3xl font-black text-[#201E43] opacity-20 tracking-tighter uppercase">No Recent Broadcasts</h3>
                            <p className="text-[#201E43]/30 font-bold mt-2">Scale your impact. Initiate a new platform update today.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
