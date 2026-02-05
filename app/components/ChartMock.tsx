import React from 'react';

const ChartMock = () => {
  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="flex-1 flex items-end justify-between gap-2 h-48 bg-slate-50/50 rounded-2xl p-6 mb-4 relative overflow-hidden">
        {/* Simple SVG Line Chart Mock */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200">
          <path 
            d="M0,150 Q50,130 100,160 T200,100 T300,140 T400,80" 
            fill="none" 
            stroke="#6366f1" 
            strokeWidth="3" 
            className="opacity-50"
          />
          <path 
            d="M0,200 L0,150 Q50,130 100,160 T200,100 T300,140 T400,80 L400,200 Z" 
            fill="url(#gradient)" 
            className="opacity-10"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:'#6366f1', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#6366f1', stopOpacity:0}} />
            </linearGradient>
          </defs>
        </svg>

        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
          <div key={i} className="relative group w-full">
            <div 
              style={{ height: `${h}%` }} 
              className="bg-indigo-100/50 group-hover:bg-indigo-400 group-hover:shadow-lg group-hover:shadow-indigo-100 w-full rounded-t-lg transition-all duration-300 relative z-10"
            ></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between px-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <span key={day} className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{day}</span>
        ))}
      </div>
    </div>
  );
};

export default ChartMock;
