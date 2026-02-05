import React from 'react';

const Chat = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm p-8 rounded-4xl shadow-sm border border-white/40 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#201E43]">Chat</h2>
        <button className="text-[#201E43] px-6 py-2 rounded-full text-xs font-bold bg-white/50 hover:bg-white transition-colors">See All</button>
      </div>

      <div className="space-y-6 flex-1">
        {/* Opponent Message */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
             <span className="text-xs font-bold text-[#201E43]">John Doe</span>
             <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src="https://i.pravatar.cc/100?u=john" alt="User" />
             </div>
          </div>
          <div className="bg-[#E1DFF6] px-5 py-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
             <p className="text-sm font-medium text-[#201E43]">Hello can you check the latest work ?</p>
          </div>
          <span className="text-[10px] font-bold text-[#7E8491]">12:20</span>
        </div>

        {/* My Message */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src="https://i.pravatar.cc/100?u=angie" alt="User" />
             </div>
             <span className="text-xs font-bold text-[#201E43]">Samantha</span>
          </div>
          <div className="bg-[#FAD9C5] p-3 rounded-2xl rounded-tl-none shadow-sm w-full flex items-center gap-3">
             <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#201E43] shrink-0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                   <path d="M8 5v14l11-7z" />
                </svg>
             </button>
             <div className="flex-1 flex items-center gap-1 h-6">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="flex-1 bg-[#201E43]/20 rounded-full" style={{ height: `${Math.random() * 100}%` }}></div>
                ))}
             </div>
             <span className="text-[10px] font-bold text-[#201E43] shrink-0">00:41</span>
          </div>
          <span className="text-[10px] font-bold text-[#7E8491] ml-11">12:20</span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
