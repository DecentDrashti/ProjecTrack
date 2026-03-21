import Link from "next/link";

export default function AdminHelpPage() {
    const helpSections = [
        {
            title: "User Management",
            content: "As an administrator, you can manage students and faculty. Use the sidebar to add, edit, or remove academic identities. Ensure data integrity by verifying enrollment numbers and faculty IDs."
        },
        {
            title: "System Configuration",
            content: "Manage global settings, department details, and project types. Configuration changes impact the entire system immediately."
        },
        {
            title: "Audit & Compliance",
            content: "Monitor meeting schedules, project progress, and faculty reviews through the master vault. Use the activity stream to track real-time system changes."
        },
        {
            title: "Announcements",
            content: "Publish global notices to all users or target specific roles (Faculty/Students). Announcements can be set to active or archived at any time."
        }
    ];

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-[#201E43] tracking-tight">Admin <span className="text-indigo-600">Support Center</span></h2>
                        <p className="text-slate-500 font-medium mt-1">Guidelines and documentation for system administrators.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {helpSections.map((section, idx) => (
                        <div key={idx} className="bg-white/40 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-all">
                            <h3 className="text-lg font-black text-[#201E43] mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-black italic">
                                    ?
                                </span>
                                {section.title}
                            </h3>
                            <p className="text-sm font-medium text-slate-500 leading-relaxed italic border-l-2 border-indigo-100 pl-4 ml-4">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-10 bg-[#201E43] rounded-[3rem] text-white text-center shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-4 tracking-tight">Technical Support Interface</h3>
                        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto font-medium">For critical system failures or database recovery, please contact the lead developer team directly.</p>
                        <a href="mailto:support@projectrack.edu" className="inline-block px-8 py-4 bg-white text-[#201E43] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-lg">Contact SysAdmin</a>
                    </div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
                </div>
            </main>
        </div>
    );
}
