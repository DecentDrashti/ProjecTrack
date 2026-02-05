// https://696dd9bdd7bacd2dd714be96.mockapi.io/Admin/project
"use client";

import React, { useState, useEffect } from 'react';
export default async function ProjectPage() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, proposal, approval, documents

  return (
    <>
  {/* Header Section */ }
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
        <span className="text-5xl font-black text-indigo-600 uppercase tracking-[0.3em]">System Administrator</span>
      </div>
      <h1 className="text-5xl font-black text-[#201E43] tracking-tight">Portal Command</h1>
      <p className="text-[#7E8491] font-medium mt-2 text-l">Central oversight and authorization for institutional initiatives.</p>
    </div>
    <div className="flex items-center">
      <div className="bg-white/70 backdrop-blur-md p-2 rounded-3xl border border-white shadow-xl flex gap-3">
        {['Overview', 'Proposal', 'Approval', 'Document'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab === 'Overview' ? 'Proposal' : tab === 'Approval' ? 'Documents' : tab)}
            className={`px-6 py-3 rounded-2xl text-[11px] font-black transition-all capitalize tracking-wider ${(activeTab === 'Overview') ||
              (activeTab === 'Proposal') ||
              (activeTab === 'Approval') ||
              (activeTab === 'Documents')
              ? 'bg-[#201E43] text-white shadow-[0_10px_20px_rgba(32,30,67,0.2)] scale-105'
              : 'text-[#7E8491] hover:bg-white hover:text-[#201E43] hover:shadow-sm'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  </div>
    {/* Main Content Area */ }
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar: Project Selection List */ }
      <aside className="lg:col-span-3 space-y-6">
        <div className="bg-white/40 backdrop-blur-md p-6 rounded-4xl border border-white/40 shadow-sm">
          <h3 className="text-sm font-black text-[#201E43] mb-5 uppercase tracking-widest">Your Projects</h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Project buttons would go here */ }
            <button className="w-full text-left p-4 rounded-3xl transition-all border bg-white border-transparent shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 bg-[#201E43] text-white">
                  P
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-[#201E43]">Project Alpha</p>
                  <p className="text-[10px] text-[#7E8491] font-medium">Guide: Dr. Smith</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-4 rounded-3xl transition-all border bg-transparent border-transparent hover:bg-white/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 bg-[#E1DFF6] text-[#201E43]">
                  P
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-[#7E8491]">Project Beta</p>
                  <p className="text-[10px] text-[#7E8491] font-medium">Guide: Dr. Johnson</p>
                </div>
              </div>
            </button>
          </div>
          <button className="mt-6 w-full py-4 border-2 border-dashed border-[#201E43]/20 text-[#201E43] rounded-3xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/40 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            New Proposal
          </button>
        </div>
      </aside>
      {/* Main Content Area */ }
      </div>
  </>
  );
}

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//           {/* Sidebar: Project Selection List */}
//           <aside className="lg:col-span-3 space-y-6">
//             <div className="bg-white/40 backdrop-blur-md p-6 rounded-4xl border border-white/40 shadow-sm">
//               <h3 className="text-sm font-black text-[#201E43] mb-5 uppercase tracking-widest">Your Projects</h3>
//               <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
//                 {data.map((item: any) => (
//                   <button
//                     key={item.id}
//                     onClick={() => setSelectedProject(item)}
//                     className={`w-full text-left p-4 rounded-3xl transition-all border ${selectedProject?.id === item.id
//                       ? 'bg-white border-transparent shadow-md'
//                       : 'bg-transparent border-transparent hover:bg-white/30'
//                       }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${selectedProject?.id === item.id ? 'bg-[#201E43] text-white' : 'bg-[#E1DFF6] text-[#201E43]'
//                         }`}>
//                         {item.Project_Name ? item.Project_Name[0] : 'P'}
//                       </div>
//                       <div className="truncate">
//                         <p className={`text-sm font-bold truncate ${selectedProject?.id === item.id ? 'text-[#201E43]' : 'text-[#7E8491]'}`}>
//                           {item.Project_Name}
//                         </p>
//                         <p className="text-[10px] text-[#7E8491] font-medium">Guide: {item.Guide_Name}</p>
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//               <button className="mt-6 w-full py-4 border-2 border-dashed border-[#201E43]/20 text-[#201E43] rounded-3xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/40 transition-all">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                 New Proposal
//               </button>
//             </div>
//           </aside>

//           {/* Main Content Area */}
//           <div className="lg:col-span-9 space-y-8">

//             {/* Project Banner Card */}
//             <div className="bg-[#201E43] p-8 md:p-10 rounded-4xl shadow-xl text-white relative overflow-hidden">
//               <div className="relative z-10">
//                 <div className="flex flex-wrap items-center gap-3 mb-4">
//                   <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 bg-white/10`}>
//                     {selectedProject?.Type || 'Academic Project'}
//                   </span>
//                   <span className="text-[10px] font-bold text-white/60 bg-white/5 py-1 px-3 rounded-full border border-white/10 uppercase">
//                     ID: #{selectedProject?.id}
//                   </span>
//                 </div>
//                 <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
//                   {selectedProject?.Project_Name}
//                 </h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
//                   <div>
//                     <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Guide Name</p>
//                     <p className="text-sm font-bold text-indigo-200">{selectedProject?.Guide_Name}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Status</p>
//                     <p className="text-sm font-bold text-emerald-400">In Development</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Type</p>
//                     <p className="text-sm font-bold text-indigo-200">{selectedProject?.Type}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Deadline</p>
//                     <p className="text-sm font-bold text-rose-300">April 15, 2026</p>
//                   </div>
//                 </div>
//               </div>
//               {/* Abstract shapes */}
//               <div className="absolute -right-10 -top-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
//               <div className="absolute right-0 bottom-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
//             </div>

//             {/* Dynamic Content based on Active Tab */}
//             {activeTab === 'overview' && (
//               <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
//                 {/* Global Admin Insights */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {[
//                     { label: 'Pending Authorizations', val: '14', trend: '+2 this week', color: 'bg-amber-50 text-amber-600' },
//                     { label: 'Active Initiatives', val: '48', trend: 'Across 4 domains', color: 'bg-indigo-50 text-indigo-600' },
//                     { label: 'Completed Lifecycle', val: '86%', trend: 'Avg. 4.2 months', color: 'bg-emerald-50 text-emerald-600' }
//                   ].map((stat, i) => (
//                     <div key={i} className={`bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-lg group hover:bg-[#201E43] transition-all duration-500`}>
//                       <p className="text-[10px] font-black group-hover:text-white/50 text-[#7E8491] uppercase tracking-[0.2em] mb-4">{stat.label}</p>
//                       <div className="flex items-end justify-between">
//                         <h4 className="text-4xl font-black group-hover:text-white text-[#201E43]">{stat.val}</h4>
//                         <span className={`text-[9px] font-black px-3 py-1 rounded-full ${stat.color} group-hover:bg-white group-hover:text-[#201E43]`}>{stat.trend}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                   {/* Strategic Overview */}
//                   <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] shadow-xl border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
//                     <div className="relative z-10">
//                       <div className="flex items-center gap-4 mb-8">
//                         <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
//                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
//                         </div>
//                         <h3 className="text-2xl font-black text-[#201E43]">Operational Merit</h3>
//                       </div>
//                       <div className="space-y-8">
//                         <p className="text-base text-[#7E8491] leading-relaxed font-medium">
//                           The current submission showcases <span className="text-indigo-600 font-black px-2 py-0.5 bg-indigo-50 rounded-lg">High Feasibility</span> for deployment. Technical complexity aligns with Phase 3 standards.
//                         </p>
//                         <div className="space-y-4">
//                           <div className="flex justify-between text-[11px] font-black text-[#201E43] uppercase tracking-wider mb-2">
//                             <span>System Architecture Alignment</span>
//                             <span>92%</span>
//                           </div>
//                           <div className="h-2 w-full bg-[#EDF0F5] rounded-full overflow-hidden">
//                             <div className="h-full bg-indigo-600 rounded-full w-[92%]"></div>
//                           </div>
//                           <p className="text-[10px] text-[#7E8491] font-bold italic">Top 5% of this semester&apos;s technical scope.</p>
//                         </div>
//                       </div>
//                     </div>
//                     {/* Decorative mesh */}
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
//                   </div>

//                   {/* Resource Allocation */}
//                   <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] shadow-xl border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
//                     <div className="relative z-10">
//                       <div className="flex items-center gap-4 mb-8">
//                         <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
//                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
//                         </div>
//                         <h3 className="text-2xl font-black text-[#201E43]">Resource Health</h3>
//                       </div>
//                       <div className="grid grid-cols-2 gap-4 mt-6">
//                         {[
//                           { label: 'Guide Load', val: 'Low', sub: '2/5 projects', color: 'emerald' },
//                           { label: 'Infrastructure', val: 'Tier 1', sub: 'GPU Optimized', color: 'indigo' },
//                           { label: 'Budget Cap', val: '$1.2k', sub: 'Spent: $240', color: 'amber' },
//                           { label: 'Timeline Risk', val: 'Minimal', sub: 'No conflicts', color: 'emerald' }
//                         ].map((item, i) => (
//                           <div key={i} className={`bg-slate-50 p-6 rounded-3xl border border-transparent transition-all hover:bg-white hover:shadow-sm`}>
//                             <p className={`text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-1`}>{item.label}</p>
//                             <p className="text-xl font-black text-[#201E43] leading-none mb-2">{item.val}</p>
//                             <p className="text-[10px] text-[#7E8491] font-bold truncate">{item.sub}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     {/* Decorative shape */}
//                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'proposal' && (
//               <div className="bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
//                 <div className="relative z-10">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
//                     <div>
//                       <h3 className="text-3xl font-black text-[#201E43]">Submission Review</h3>
//                       <p className="text-[#7E8491] font-medium mt-1">Evaluate the technical merit and institutional alignment of this project.</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 uppercase tracking-widest">Version 2.4.1</span>
//                       <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
//                     {/* Left: Proposal Content (Read-only for Admin) */}
//                     <div className="lg:col-span-7 space-y-10">
//                       <div className="p-8 bg-[#EDF0F5]/30 rounded-[2.5rem] border border-transparent hover:border-indigo-100 transition-all">
//                         <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">Project Architecture</h4>
//                         <h2 className="text-2xl font-black text-[#201E43] mb-4">{selectedProject?.Project_Name}</h2>
//                         <p className="text-sm text-[#7E8491] leading-relaxed font-medium">
//                           This project proposes a <span className="text-[#201E43] font-bold">{selectedProject?.Type}</span> approach to solving modern scalability bottlenecks. The integration of real-time monitoring and adaptive load balancing is central to the design.
//                         </p>
//                       </div>

//                       <div className="grid grid-cols-2 gap-6">
//                         <div className="p-6 bg-white rounded-3xl border border-[#EDF0F5] shadow-sm">
//                           <p className="text-[9px] font-black text-[#7E8491] uppercase tracking-widest mb-2">Principal Investigator</p>
//                           <p className="text-sm font-bold text-[#201E43]">{selectedProject?.Student_Name || 'Drashti'}</p>
//                         </div>
//                         <div className="p-6 bg-white rounded-3xl border border-[#EDF0F5] shadow-sm">
//                           <p className="text-[9px] font-black text-[#7E8491] uppercase tracking-widest mb-2">Assigned Mentor</p>
//                           <p className="text-sm font-bold text-[#201E43]">{selectedProject?.Guide_Name}</p>
//                         </div>
//                       </div>

//                       <div className="p-8 bg-white rounded-[2.5rem] border border-[#EDF0F5] shadow-sm">
//                         <h4 className="text-[11px] font-black text-[#201E43] uppercase tracking-widest mb-4">Technical Stack Observation</h4>
//                         <div className="flex flex-wrap gap-3">
//                           {['Next.js', 'PostgreSQL', 'TensorFlow', 'Docker', 'Kubernetes'].map(tech => (
//                             <span key={tech} className="px-5 py-2 bg-[#EDF0F5]/50 text-[#201E43] text-[10px] font-black rounded-xl border border-transparent hover:border-indigo-200 transition-all">
//                               {tech}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right: Admin Action Center */}
//                     <div className="lg:col-span-5 space-y-8">
//                       <div className="p-8 bg-[#201E43] rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
//                         <div className="relative z-10">
//                           <h4 className="text-lg font-black mb-6">Authorization Panel</h4>
//                           <div className="space-y-6">
//                             <div>
//                               <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-3">Professional Verdict</label>
//                               <div className="grid grid-cols-2 gap-3">
//                                 <button className="py-4 bg-emerald-500 text-white rounded-2xl text-[11px] font-black shadow-lg hover:scale-105 transition-all">APPROVE</button>
//                                 <button className="py-4 bg-white/10 text-white rounded-2xl text-[11px] font-black border border-white/10 hover:bg-rose-500 transition-all">REJECT</button>
//                               </div>
//                             </div>
//                             <div>
//                               <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-3">Admin Feedback</label>
//                               <textarea
//                                 className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium focus:bg-white/10 transition-all outline-none resize-none"
//                                 rows={4}
//                                 placeholder="Provide technical guidance or revision requirements..."
//                               ></textarea>
//                             </div>
//                             <button className="w-full py-5 border-2 border-indigo-400 text-indigo-400 rounded-2xl text-[11px] font-black hover:bg-indigo-400 hover:text-white transition-all">REQUEST TECHNICAL REVISION</button>
//                           </div>
//                         </div>
//                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
//                       </div>

//                       <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 shadow-sm">
//                         <div className="flex items-center gap-3 mb-4">
//                           <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
//                           </div>
//                           <h4 className="text-sm font-black text-amber-900 uppercase tracking-tight">Compliance Alert</h4>
//                         </div>
//                         <p className="text-xs text-amber-800/70 font-bold leading-relaxed">
//                           This project involves user PII. Ensure Data Protection Addendum (DPA) is signed before moving to Phase 2.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Visual Flair */}
//                 <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px]"></div>
//               </div>
//             )}

//             {activeTab === 'approval' && (
//               <div className="bg-white p-8 md:p-10 rounded-4xl shadow-sm border border-white/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
//                 <h3 className="text-2xl font-black text-[#201E43] mb-10 text-center">Project Approval Workflow</h3>
//                 <div className="max-w-3xl mx-auto relative">
//                   {/* Timeline Background Line */}
//                   <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2 hidden md:block"></div>

//                   <div className="space-y-12">
//                     {[
//                       { step: 'Submission', status: 'Completed', date: 'Jan 12, 2026', info: 'Proposal received by department head.', active: true },
//                       { step: 'Topic Verification', status: 'Completed', date: 'Jan 15, 2026', info: 'Uniqueness and feasibility verified.', active: true },
//                       { step: 'Guide Allotment', status: 'In Progress', date: 'Ongoing', info: `Assigned to ${selectedProject?.Guide_Name}.`, active: true },
//                       { step: 'Final Approval', status: 'Upcoming', date: 'Pending', info: 'Review by the institutional committee.', active: false }
//                     ].map((phase, i) => (
//                       <div key={i} className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 relative ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
//                         {/* Step Number Dot */}
//                         <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm z-10 border-4 border-white shadow-lg shrink-0 ${phase.status === 'Completed' ? 'bg-emerald-500 text-white' :
//                           phase.status === 'In Progress' ? 'bg-[#201E43] text-white animate-pulse' :
//                             'bg-slate-200 text-slate-500'
//                           }`}>
//                           {i + 1}
//                         </div>

//                         {/* Content Card */}
//                         <div className={`flex-1 w-full bg-[#EDF0F5]/40 p-6 rounded-4xl border border-transparent transition-all ${phase.status === 'In Progress' ? 'border-indigo-200 bg-white shadow-xl scale-105' : ''}`}>
//                           <div className="flex justify-between items-start mb-2">
//                             <h4 className="text-lg font-black text-[#201E43]">{phase.step}</h4>
//                             <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border ${phase.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
//                               phase.status === 'In Progress' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
//                                 'bg-slate-50 text-slate-400 border-slate-100'
//                               }`}>
//                               {phase.status}
//                             </span>
//                           </div>
//                           <p className="text-xs text-[#7E8491] font-medium leading-relaxed mb-4">{phase.info}</p>
//                           <div className="flex items-center gap-2">
//                             <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
//                               <svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3" /></svg>
//                             </div>
//                             <span className="text-[10px] font-bold text-[#7E8491]">{phase.date}</span>
//                           </div>
//                         </div>

//                         {/* Spacer for reverse layout */}
//                         <div className="flex-1 hidden md:block"></div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'documents' && (
//               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
//                 {/* Upload Section */}
//                 <div className="bg-white p-8 md:p-10 rounded-4xl shadow-sm border border-white/20">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//                     <div>
//                       <h3 className="text-2xl font-black text-[#201E43]">Document Vault</h3>
//                       <p className="text-[#7E8491] text-xs font-medium mt-1">Manage all your project deliverables and certificates.</p>
//                     </div>
//                     <button className="bg-[#201E43] text-white px-8 py-3 rounded-2xl font-bold text-xs shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
//                       Upload New
//                     </button>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[
//                       { name: 'Project_Proposal.pdf', type: 'PDF', size: '2.4 MB', date: 'Jan 12', icon: 'bg-rose-50 text-rose-500' },
//                       { name: 'System_Architecture.png', type: 'IMG', size: '4.8 MB', date: 'Feb 05', icon: 'bg-indigo-50 text-indigo-500' },
//                       { name: 'Literature_Review.docx', type: 'DOC', size: '1.1 MB', date: 'Feb 10', icon: 'bg-blue-50 text-blue-500' },
//                       { name: 'Database_Schema.sql', type: 'CODE', size: '0.2 MB', date: 'Feb 15', icon: 'bg-emerald-50 text-emerald-500' },
//                     ].map((doc, i) => (
//                       <div key={i} className="group p-6 bg-[#EDF0F5]/40 rounded-4xl border border-transparent hover:border-indigo-200 hover:bg-white transition-all hover:shadow-xl">
//                         <div className={`w-12 h-12 rounded-2xl ${doc.icon} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
//                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                           </svg>
//                         </div>
//                         <h4 className="text-sm font-black text-[#201E43] truncate mb-1">{doc.name}</h4>
//                         <div className="flex items-center justify-between mt-4">
//                           <span className="text-[10px] font-bold text-[#7E8491] uppercase tracking-widest">{doc.size}</span>
//                           <div className="flex gap-2">
//                             <button className="p-2 bg-white rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm border border-slate-100 transition-all">
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                             </button>
//                             <button className="p-2 bg-white rounded-xl text-slate-400 hover:text-rose-500 shadow-sm border border-slate-100 transition-all">
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Drop Zone */}
//                 <div className="border-4 border-dashed border-[#201E43]/10 rounded-4xl p-16 text-center bg-white group hover:border-indigo-300 transition-all cursor-pointer">
//                   <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
//                     <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <h4 className="text-xl font-black text-[#201E43]">Drop files here to upload</h4>
//                   <p className="text-[#7E8491] text-sm font-medium mt-2">Maximum file size 50MB. Support PDF, ZIP, JPG, DXF.</p>
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>

//         {/* Floating Support Button Icon Style */}
//         <button className="fixed bottom-10 right-10 w-16 h-16 bg-[#201E43] text-white rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 transition-all z-50">
//           <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
//           <span className="absolute right-full mr-4 bg-white text-[#201E43] px-4 py-2 rounded-2xl text-[10px] font-black shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 border border-[#EDF0F5]">Chat with Support</span>
//         </button>

//       </main>

//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 5px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #201E4320;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #201E4340;
//         }
//       `}</style>
//     </div>
//   );
// }
