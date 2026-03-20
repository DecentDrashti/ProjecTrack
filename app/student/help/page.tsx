import React from "react";

export default function HelpPage() {
    const helpSections = [
        {
            id: "tasks",
            title: "How to Submit Tasks",
            icon: "📝",
            content: "Navigate to the 'Tasks' dashboard to view all active assignments. Click on a task to view detailed instructions or click the 'Submit' button to upload your project files. Ensure your submission is in the required format (e.g., ZIP or GitHub link) before clicking the final 'Submit' button."
        },
        {
            id: "performance",
            title: "How Performance is Calculated",
            icon: "📊",
            content: "Your performance score is a weighted average of your task completion (60%), meeting attendance (20%), and individual peer/faculty reviews (20%). High-quality, timely submissions and active group participation are key to achieving a top score."
        },
        {
            id: "attendance",
            title: "Meeting Attendance Rules",
            icon: "📍",
            content: "Regular project meetings are mandatory. You must mark your attendance via the dashboard or through your guide faculty. For planned absences, notify your guide at least 24 hours in advance. Consistent absence without notice may result in a performance penalty."
        },
        {
            id: "review",
            title: "Review System Explanation",
            icon: "🔍",
            content: "The review system includes periodic progress assessments by your guide faculty. During each review cycle, your project status is evaluated based on technical robustness, innovation, and adherence to the project timeline. Feedback from these reviews will be visible in your performance tab."
        }
    ];

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-4xl mx-auto mt-8">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-black text-[#201E43] tracking-tight">
                        Help & Guidelines 📘
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">
                        Everything you need to know about the ProjecTrack ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {helpSections.map((section) => (
                        <div key={section.id} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-white hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl group-hover:bg-indigo-600 transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                                    {section.icon}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-black text-[#201E43] mb-3 group-hover:text-indigo-600 transition-colors tracking-tight">
                                        {section.title}
                                    </h2>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Support Card */}
                <div className="mt-12 bg-[#201E43] rounded-[2.5rem] p-10 text-white text-center relative overflow-hidden shadow-2xl shadow-indigo-900/30">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black mb-4">Still have questions?</h2>
                        <p className="text-indigo-200 text-sm mb-8 font-medium max-w-md mx-auto leading-relaxed">
                            Our support coordinators are here to assist you with any technical issues or project-related concerns.
                        </p>
                        <button className="px-8 py-3.5 bg-white text-[#201E43] font-black rounded-2xl hover:bg-slate-50 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest active:scale-95">
                            Contact Support
                        </button>
                    </div>
                    {/* Background glows */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>
            </main>
        </div>
    );
}
