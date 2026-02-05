import React from 'react';

const TrackerDetail = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm p-8 rounded-4xl shadow-sm border border-white/40 h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-[#201E43]">Tracker Detail</h2>
        <button className="text-[#201E43] px-6 py-2 rounded-full text-xs font-bold bg-white/50 hover:bg-white transition-colors">See All</button>
      </div>
      
      <div className="flex justify-end gap-4 mb-8">
         <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FAD9C5]"></div>
            <span className="text-[10px] font-bold text-[#7E8491]">Focus Session</span>
         </div>
         <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#CAE7F5]"></div>
            <span className="text-[10px] font-bold text-[#7E8491]">Break Session</span>
         </div>
      </div>

      <div className="flex items-end justify-around h-40 gap-4">
         {[
           { f: 40, b: 60 },
           { f: 70, b: 30 },
           { f: 55, b: 45 },
           { f: 80, b: 20 },
         ].map((bar, i) => (
           <div key={i} className="flex-1 max-w-[40px] flex flex-col items-center gap-1.5">
              <div className="w-full h-32 bg-slate-100 rounded-full relative overflow-hidden">
                {/* Diagonal stripes for "Break" part */}
                <div 
                  className="absolute top-0 w-full bg-[#CAE7F5] transition-all" 
                  style={{ height: `${bar.b}%`, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.2) 5px, rgba(255,255,255,0.2) 10px)' }}
                />
                {/* Solid for "Fokus" part */}
                <div 
                  className="absolute bottom-0 w-full bg-[#FAD9C5] transition-all rounded-full" 
                  style={{ height: `${bar.f}%` }} 
                />
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default TrackerDetail;
