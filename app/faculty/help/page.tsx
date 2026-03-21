import Link from "next/link";

export default function FacultyHelpPage() {
    const helpSections = [
        {
            title: "Supervision",
            content: "Access your dashboard to see all assigned project groups. You can update project status, assign tasks, and monitor student progress in the Supervisions section."
        },
        {
            title: "Project Reviews",
            content: "Regular reviews are essential for project success. Provide detailed feedback and update the progress percentage during every review session. Reviews can be given through the Project Reviews module."
        },
        {
            title: "Meetings & Attendance",
            content: "Schedule and manage project meetings. For every meeting conducted, mark the attendance of participating students. Use the Attendance Audit module to maintain engagement records."
        },
        {
            title: "Announcements",
            content: "Communicate directly with your students by creating announcements. Select specific target roles or groups to ensure your message reaches the right audience."
        }
    ];

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-[#201E43] tracking-tight">Faculty <span className="text-indigo-600">Support Center</span></h2>
                        <p className="text-slate-500 font-medium mt-1">Operational instructions and guidelines for faculty members.</p>
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
                        <h3 className="text-xl font-black mb-4 tracking-tight">Support & Coordination</h3>
                        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto font-medium">For department-specific policy changes or database correction, please coordinate with the Administrative Office.</p>
                        <a href="mailto:admin@projectrack.edu" className="inline-block px-8 py-4 bg-white text-[#201E43] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-lg">Contact Admin</a>
                    </div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
                </div>
            </main>
        </div>
    );
}
