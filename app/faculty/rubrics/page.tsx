import Link from "next/link";

export default function FacultyRubricsPage() {
    const rubrics = [
        {
            category: "Documentation & Progress",
            weightage: "20%",
            criteria: [
                "Completeness of logbooks",
                "Quality of literature review",
                "Adherence to submission deadlines",
                "Regularity in project meetings"
            ],
            color: "bg-indigo-50 text-indigo-600 border-indigo-100"
        },
        {
            category: "Implementation & Code",
            weightage: "40%",
            criteria: [
                "Modular architecture",
                "Code quality and optimization",
                "Feature completeness (as proposed)",
                "Error handling and security"
            ],
            color: "bg-emerald-50 text-emerald-600 border-emerald-100"
        },
        {
            category: "Presentation & Viva",
            weightage: "25%",
            criteria: [
                "Communication skills",
                "Depth of technical knowledge",
                "Response to tricky queries",
                "Visual quality of presentation slides"
            ],
            color: "bg-amber-50 text-amber-600 border-amber-100"
        },
        {
            category: "Project Innovation",
            weightage: "15%",
            criteria: [
                "Uniqueness of solution",
                "Impact on potential stakeholders",
                "Use of modern technology stack",
                "Feasibility of the solution"
            ],
            color: "bg-rose-50 text-rose-600 border-rose-100"
        }
    ];

    return (
        <div className="pb-12 px-6 lg:px-10">
            <main className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-[#201E43] tracking-tight">Evaluation <span className="text-indigo-600">Rubrics</span></h2>
                        <p className="text-slate-500 font-medium mt-1">Standardized criteria for student project assessment.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {rubrics.map((rubric, idx) => (
                        <div key={idx} className="bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group">
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${rubric.color}`}>
                                    {rubric.weightage} Weightage
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-[#201E43] mb-6 group-hover:text-indigo-600 transition-colors">
                                {rubric.category}
                            </h3>
                            <ul className="space-y-4 flex-1">
                                {rubric.criteria.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0"></div>
                                        <span className="text-sm font-semibold text-slate-500 leading-tight">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-8 border-t border-[#201E43]/5">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Scale: 1 (Poor) to 10 (Excellent)</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rubric Footer Note */}
                <div className="mt-12 bg-white/40 border border-white p-8 rounded-[2.5rem] flex items-center gap-6 shadow-sm">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 p-4 shrink-0">
                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-[#201E43]">Evaluation Guidelines</h4>
                        <p className="text-sm text-slate-500 font-medium">Please ensure consistent scoring across all supervised groups. Use the audit remarks section in reviews to justify scores above 8 or below 4.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
