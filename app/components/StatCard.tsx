import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
  trend: 'up' | 'down';
}

const StatCard = ({ title, value, change, icon, color, trend }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 flex flex-col gap-4 group hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
          </svg>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend === 'up' ? '+' : '-'}{change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
