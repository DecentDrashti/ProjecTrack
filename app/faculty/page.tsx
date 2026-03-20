"use client";

import TodayTask from '../components/TodayTask';
import ProjectCompleted from '../components/ProjectCompleted';
import RankPerformance from '../components/RankPerformance';
import TrackerDetail from '../components/TrackerDetail';
import Chat from '../components/Chat';
import Link from 'next/link';

const FacultyDashboard = () => {
  return (
    <div className="pb-12">
      <main className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-10 px-10">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-[#201E43] tracking-tight">Dashboard</h2>
        <small>~Where Project Stays on Track</small>
        <div className="flex items-center gap-2 mt-1">
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <Link href="faculty/project" className="bg-[#201E43] text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:opacity-90 transition-all flex items-center gap-2">
          Project list
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>

        {/* Top Section: Today Task & Project Completed */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-10 mb-10">
          <div className="xl:col-span-2">
            <TodayTask />
          </div>
          <div className="bg-white/40 backdrop-blur-sm p-8 rounded-4xl shadow-sm border border-white/40">
            <ProjectCompleted />
          </div>
        </div>

        {/* Bottom Section: Grid of 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-10">
          <RankPerformance />
          <TrackerDetail />
          <Chat />
        </div>
      </main>
    </div>
  );
}
export default FacultyDashboard;

// import { redirect } from 'next/navigation';

// export default function FacultyPage() {
//     redirect('/');
// }

// import { redirect } from 'next/navigation';

// export default function faculty() {
//   redirect('/dashboard/faculty');
// }