import React from 'react';

const TaskCard = ({ title, color, progress, total, avatars }: any) => {
  return (
    <div className={`${color} p-6 rounded-3xl flex flex-col gap-6 h-full min-w-[240px] shadow-sm`}>
      <div>
        <span className="bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-grey uppercase tracking-wider">
          High Priority
        </span>
        <h3 className="text-3xl font-bold text-[#201E43] mt-4 leading-tight">{title}</h3>
      </div>
      
      <div className="flex -space-x-2">
        {avatars.map((a: string, i: number) => (
          <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-sm">
            <img src={a} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-2">
        <div className="w-full h-1.5 bg-[#201E43]/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#201E43] rounded-full" 
            style={{ width: `${(progress/total) * 100}%` }}
          />
        </div>
        <div className="flex justify-end">
          <span className="text-[11px] font-bold text-[#201E43] opacity-80">{progress}/{total}</span>
        </div>
      </div>
    </div>
  );
};

const TodayTask = () => {
  const tasks = [
    { title: 'Frontend', color: 'bg-[#CAE7F5]', progress: 10, total: 20, avatars: ['https://i.pravatar.cc/100?u=1', 'https://i.pravatar.cc/100?u=2', 'https://i.pravatar.cc/100?u=3'] },
    { title: 'Backened', color: 'bg-[#E1DFF6]', progress: 10, total: 20, avatars: ['https://i.pravatar.cc/100?u=4', 'https://i.pravatar.cc/100?u=5', 'https://i.pravatar.cc/100?u=6'] },
    { title: 'Deployement', color: 'bg-[#FAD9C5]', progress: 10, total: 20, avatars: ['https://i.pravatar.cc/100?u=7', 'https://i.pravatar.cc/100?u=8', 'https://i.pravatar.cc/100?u=9'] },
  ];

  return (
    <div className="bg-white p-8 rounded-4xl shadow-sm border border-white/20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#201E43]">Today Task</h2>
        <button className="bg-[#EDF0F5] text-[#201E43] px-6 py-2 rounded-full text-xs font-bold hover:bg-[#E2E8F0] transition-colors">See All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.map((task, i) => (
          <TaskCard key={i} {...task} />
        ))}
      </div>
    </div>
  );
};

export default TodayTask;
