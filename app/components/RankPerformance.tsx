import React from 'react';

const RankPerformance = () => {
  const users = [
    { name: 'Cindy Marlina', role: 'Marketing Specialist', points: 115, avatar: 'https://i.pravatar.cc/100?u=cindy' },
    { name: 'Robbie Harrison', role: 'Product Manager', points: 114, avatar: 'https://i.pravatar.cc/100?u=robbie' },
    { name: 'Mavis Mata', role: 'Customer Service', points: 115, avatar: 'https://i.pravatar.cc/100?u=mavis' },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm p-8 rounded-4xl shadow-sm border border-white/40 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#201E43]">Rank Performance</h2>
        <button className="text-[#201E43] px-6 py-2 rounded-full text-xs font-bold bg-white/50 hover:bg-white transition-colors">See All</button>
      </div>

      <div className="space-y-6">
        {users.map((user, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src={user.avatar} alt={user.name} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#201E43] leading-none">{user.name}</p>
                <p className="text-[11px] font-medium text-[#7E8491] mt-1">{user.role}</p>
              </div>
            </div>
            <div className="text-right">
               <p className="text-sm font-bold text-[#201E43]">{user.points} Point</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankPerformance;
