import { prisma } from "@/app/lib/prisma";
import React from "react";
import Link from "next/link";

export default async function StudentAnnouncementsPage() {
    const announcements = await prisma.announcement.findMany({
        where: {
            IsActive: true,
            TargetRole: { in: ["STUDENT", "ALL"] }
        },
        orderBy: { Created: "desc" }
    });

    return (
        <div className="min-h-screen bg-[#EDF0F5] pb-20 p-6 lg:p-10 font-sans">
             <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-[#201E43] tracking-tighter uppercase mb-2">Notice Board</h1>
                        <p className="text-[#201E43]/40 font-bold uppercase tracking-[0.2em] text-xs">Official synchronization broadcasts</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {announcements.length > 0 ? (
                        announcements.map((ann) => (
                            <div key={ann.AnnouncementID} className="bg-white/40 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 group hover:-translate-y-1 transition-all">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                     <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                                         ann.CreatedByRole === 'ADMIN' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                                     }`}>
                                         Verified: {ann.CreatedByRole}
                                     </span>
                                     <span className="text-[10px] font-black text-[#201E43]/30 uppercase tracking-widest">
                                         {ann.Created ? new Date(ann.Created).toLocaleDateString('en-GB', { dateStyle: 'full' }) : 'Recent'}
                                     </span>
                                </div>
                                <h2 className="text-2xl font-black text-[#201E43] tracking-tight mb-3 uppercase group-hover:text-indigo-600 transition-colors">
                                    {ann.Title}
                                </h2>
                                <p className="text-[#201E43]/70 font-bold leading-relaxed italic text-lg opacity-80">
                                    "{ann.Message}"
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="py-24 bg-white/30 border-4 border-dashed border-white/60 rounded-[3rem] text-center">
                            <h3 className="text-3xl font-black text-[#201E43] opacity-20 tracking-tighter uppercase">Silence is Golden</h3>
                            <p className="text-[#201E43]/30 font-bold mt-2">No active broadcasts currently on the dashboard.</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/student" className="inline-flex items-center gap-2 text-[10px] font-black text-[#201E43]/40 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                         Fallback to Dashboard
                    </Link>
                </div>
             </div>
        </div>
    );
}
