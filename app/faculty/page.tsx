"use client";

import TodayTask from '../components/TodayTask';
import ProjectCompleted from '../components/ProjectCompleted';
import RankPerformance from '../components/RankPerformance';
import TrackerDetail from '../components/TrackerDetail';
import Chat from '../components/Chat';
import Banner from '../components/Banner';

const FacultyDashboard = () => {
  return (
    <div className="pb-12">
      <main className="max-w-[1600px] mx-auto">
        <Banner />

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