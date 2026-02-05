import React from 'react';

interface ProjectCardProps {
  name: string;
  category: string;
  progress: number;
  members: string[];
  dueDate: string;
  color: string;
}

const ProjectCard = ({ name, category, progress, members, dueDate, color }: ProjectCardProps) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg ${color} mb-2 inline-block`}>
            {category}
          </span>
          <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{name}</h4>
        </div>
        <button className="text-slate-300 hover:text-slate-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500">Progress</span>
          <span className="text-xs font-bold text-slate-900">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex -space-x-2">
          {members.map((m, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 overflow-hidden shadow-sm">
               {m}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-sm cursor-pointer hover:bg-indigo-100 transition-colors">
            +3
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium">{dueDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
