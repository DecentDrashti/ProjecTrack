import React from 'react';

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-10 px-10">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-[#201E43] tracking-tight">Dashboard</h2>
        <small>~Where Project Stays on Track</small>
        <div className="flex items-center gap-2 mt-1">
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <button className="bg-[#201E43] text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:opacity-90 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>
    </div>
  );
};

export default  Banner;
