import { prisma } from "@/app/lib/prisma";
import React from "react";
import Link from "next/link";
import { UpdateAnnouncementAction } from '@/app/action/UpdateAnnouncementAction';

export default async function AdminEditAnnouncement({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const a = await prisma.announcement.findUnique({
    where: { AnnouncementID: id }
  });

  if (!a) return <div>Announcement not found</div>;

  return (
    <div className="min-h-screen relative overflow-hidden font-sans pb-20 flex items-center justify-center p-6 bg-[#EDF0F5]">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none" style={{ filter: 'url(#goo)' }}>
        <div className="absolute top-[5%] left-[10%] w-[30%] h-[30%] bg-[#201E43]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-white/40 backdrop-blur-[30px] rounded-[2.5rem] border border-white/60 shadow-2xl shadow-slate-200/50 p-8 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-[#201E43] tracking-tight mb-2 uppercase">Refine Broadcast</h1>
            <p className="text-[#201E43]/60 font-black italic">"Make sure the message is clear for the platform."</p>
          </div>

          <form action={UpdateAnnouncementAction} className="space-y-6">
            <input type="hidden" name="AnnouncementID" value={id} />
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Headline</label>
              <input
                type="text"
                name="Title"
                defaultValue={a.Title || ""}
                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 shadow-sm transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Message Content</label>
              <textarea
                name="Message"
                defaultValue={a.Message || ""}
                rows={4}
                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 shadow-sm resize-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#201E43]/60 uppercase tracking-[0.2em] ml-1">Audient Reach</label>
              <select
                name="TargetRole"
                className="w-full px-5 py-4 bg-white/60 border border-white/80 rounded-2xl text-sm font-black text-[#201E43] focus:outline-none focus:ring-4 focus:ring-[#201E43]/5 shadow-sm appearance-none cursor-pointer"
                required
                defaultValue={a.TargetRole || "ALL"}
              >
                <option value="ALL">ALL (Platform Wide)</option>
                <option value="STUDENT">STUDENTS ONLY</option>
                <option value="FACULTY">FACULTY ONLY</option>
                <option value="ADMIN">ADMINS ONLY</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-[#201E43] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-[#201E43]/10"
            >
              Update Broadcast
            </button>
          </form>

          <div className="mt-10 text-center">
            <Link
              href="/admin/announcement"
              className="inline-flex items-center gap-2 text-[10px] font-black text-[#201E43]/40 uppercase tracking-widest hover:text-[#201E43] transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Discard Changes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
