import React from 'react';

const ProjectCompleted = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#201E43]">Project Completed</h2>
        <span className="text-xs font-bold text-[#7E8491]">Total project 100</span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 flex-1">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full bg-[#E1DFF6]"></div>
             <div>
                <p className="text-[11px] font-bold text-[#7E8491] uppercase tracking-wider">Project Done</p>
                <p className="text-3xl font-bold text-[#201E43]">50%</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full bg-[#FAD9C5]"></div>
             <div>
                <p className="text-[11px] font-bold text-[#7E8491] uppercase tracking-wider">In Progress</p>
                <p className="text-3xl font-bold text-[#201E43]">25%</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full bg-[#CAE7F5]"></div>
             <div>
                <p className="text-[11px] font-bold text-[#7E8491] uppercase tracking-wider">Backlog</p>
                <p className="text-3xl font-bold text-[#201E43]">15%</p>
             </div>
          </div>
        </div>

        {/* Circular Donut Mock using SVG */}
        <div className="relative w-56 h-56 flex items-center justify-center">
           <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Inner Track */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#EDF0F5" strokeWidth="8" />
              {/* Lavender Ring (50%) */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E1DFF6" strokeWidth="8" strokeDasharray="141 282" strokeLinecap="round" />
              
              {/* Peach Track */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#EDF0F5" strokeWidth="8" />
              {/* Peach Ring (25%) */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#FAD9C5" strokeWidth="8" strokeDasharray="55 219" strokeLinecap="round" />

              {/* Blue Track */}
              <circle cx="50" cy="50" r="25" fill="none" stroke="#EDF0F5" strokeWidth="8" />
              {/* Blue Ring (15%) */}
              <circle cx="50" cy="50" r="25" fill="none" stroke="#CAE7F5" strokeWidth="8" strokeDasharray="23 157" strokeLinecap="round" />
           </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectCompleted;
