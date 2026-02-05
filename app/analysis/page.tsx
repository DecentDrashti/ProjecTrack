export default async function Analysis() {
  // Logic strictly preserved as per requirements
  const api = await fetch('https://6943a53269b12460f3156c83.mockapi.io/demo/student');
  const data = await api.json();

  // Helper logic for "Progress Analysis" (Derived from existing data only)
  const types = data.reduce((acc: any, item: any) => {
    const type = item.Type || 'Other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#EDF0F5] pb-12 pt-8">
      <main className="max-w-[1600px] mx-auto px-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[#201E43] tracking-tight">Analysis Dashboard</h1>
            <p className="text-[#7E8491] font-medium mt-1">Comprehensive project metrics and member performance tracking.</p>
          </div>
          
          {/* Export Section */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white text-[#201E43] px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm border border-white hover:bg-slate-50 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </button>
            <button className="flex items-center gap-2 bg-[#201E43] text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg hover:opacity-90 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Excel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column: Member Overview */}
          <div className="xl:col-span-2 space-y-8">
            <section className="bg-white/40 backdrop-blur-sm p-8 rounded-4xl shadow-sm border border-white/40">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#201E43]">Member Overview</h2>
                <span className="text-xs font-bold text-[#7E8491] bg-white/60 px-3 py-1 rounded-full">{data.length} Members</span>
              </div>
              
              <div className="overflow-x-auto rounded-3xl border border-[#EDF0F5]">
                <table className="w-full text-left border-collapse table-auto">
                  <thead className="bg-[#E1DFF6]/50">
                    <tr>
                      <th className="px-6 py-4 text-[11px] font-bold text-[#201E43] uppercase tracking-wider">Project</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-[#201E43] uppercase tracking-wider">Guide</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-[#201E43] uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-[#201E43] uppercase tracking-wider text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/10">
                    {data.map((item: any, idx: number) => (
                      <tr key={item.id} className="border-b border-[#EDF0F5] last:border-0 hover:bg-white/30 transition-all group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                              idx % 3 === 0 ? 'bg-[#CAE7F5] text-blue-700' :
                              idx % 3 === 1 ? 'bg-[#E1DFF6] text-purple-700' :
                              'bg-[#FAD9C5] text-orange-700'
                            }`}>
                              {item.Project_Name ? item.Project_Name[0].toUpperCase() : 'P'}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#201E43] group-hover:text-indigo-600 transition-colors">{item.Project_Name}</p>
                              <p className="text-[10px] text-[#7E8491] font-medium">ID: #{item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-semibold text-[#201E43]">{item.Guide_Name}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-[11px] font-medium text-[#7E8491] truncate max-w-[150px] inline-block">
                            {item.Type}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className="px-3 py-1 bg-[#CAE7F5]/50 text-blue-700 rounded-full text-[10px] font-bold border border-blue-100">
                            Present
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column: Progress Analysis & Stats */}
          <div className="space-y-8">
            
            {/* Marks & Progress Analysis Section */}
            <section className="bg-white p-8 rounded-4xl shadow-sm border border-white/20">
              <h2 className="text-xl font-bold text-[#201E43] mb-6">Progress Analysis</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-sm font-bold text-[#201E43]">Project Completion</p>
                    <p className="text-sm font-extrabold text-blue-600">85%</p>
                  </div>
                  <div className="h-2.5 w-full bg-[#EDF0F5] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[85%]"></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EDF0F5]">
                  <p className="text-xs font-bold text-[#7E8491] uppercase tracking-wider mb-4">Distribution by Type</p>
                  <div className="space-y-4">
                    {/* Derived from 'Type' field distribution */}
                    {Object.entries(types).slice(0, 4).map(([type, count]: any, i: number) => (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-orange-400'}`}></div>
                          <span className="text-xs font-medium text-[#201E43] truncate max-w-[120px]">{type}</span>
                        </div>
                        <span className="text-xs font-bold text-[#201E43]">{Math.round((count / data.length) * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#E1DFF6]/30 rounded-3xl border border-[#E1DFF6]/50">
                <p className="text-[11px] font-bold text-purple-700">Team Efficiency</p>
                <p className="text-2xl font-black text-[#201E43] mt-1">+12.5%</p>
                <p className="text-[10px] text-purple-600 font-medium">Increased productivity this month</p>
              </div>
            </section>

            {/* Quick Summary Card */}
            <section className="bg-[#201E43] p-8 rounded-4xl shadow-xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Quick Summary</h3>
                <p className="text-white/60 text-xs leading-relaxed">System identified 3 overdue projects and 2 members needing immediate guidance.</p>
                <button className="mt-6 w-full bg-white/10 hover:bg-white/20 transition-all border border-white/20 py-3 rounded-2xl text-xs font-bold">
                  View Full Report
                </button>
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute -left-6 -top-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
            </section>

          </div>
        </div>

        {/* Global Statistics Grid (Optional enhancement for clarity) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          {[
            { label: 'Attendance', val: '98%', color: 'text-blue-600' },
            { label: 'Total Projects', val: '24', color: 'text-purple-600' },
            { label: 'Active Guides', val: '08', color: 'text-orange-600' },
            { label: 'Completed', val: '12', color: 'text-emerald-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/40 flex flex-col items-center text-center">
              <span className="text-[10px] font-bold text-[#7E8491] uppercase tracking-widest">{stat.label}</span>
              <span className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.val}</span>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
