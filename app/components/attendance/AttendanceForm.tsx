'use client';

import React, { useState } from 'react';
import { MarkAttendanceAction } from '@/app/action/MarkAttendanceAction';
import Link from 'next/link';

interface AttendanceFormProps {
    meeting: any;
    students: any[];
    initialAttendance: any[];
}

export default function AttendanceForm({ meeting, students, initialAttendance }: AttendanceFormProps) {
    const [attendanceData, setAttendanceData] = useState<Record<number, boolean>>(() => {
        const data: Record<number, boolean> = {};
        // Pre-fill existing attendance
        initialAttendance.forEach((att: any) => {
            data[att.StudentID] = att.IsPresent;
        });
        // Default others to true
        students.forEach((s: any) => {
            if (data[s.StudentID] === undefined) {
                data[s.StudentID] = true;
            }
        });
        return data;
    });

    const [remarksData, setRemarksData] = useState<Record<number, string>>(() => {
        const data: Record<number, string> = {};
        initialAttendance.forEach((att: any) => {
            data[att.StudentID] = att.AttendanceRemarks || "";
        });
        return data;
    });

    const handleToggle = (studentId: number) => {
        setAttendanceData(prev => ({ ...prev, [studentId]: !prev[studentId] }));
    };

    const handleRemark = (studentId: number, text: string) => {
        setRemarksData(prev => ({ ...prev, [studentId]: text }));
    };

    const markAllPresent = () => {
        const allPresent: Record<number, boolean> = {};
        students.forEach(s => allPresent[s.StudentID] = true);
        setAttendanceData(allPresent);
    };

    return (
        <div className="bg-white/40 shadow-2xl shadow-slate-200/50 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#201E43]/5">
                <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </span>
                    <h3 className="text-xl font-black text-[#201E43]">Group Members ({students.length})</h3>
                </div>
                <button 
                    type="button"
                    onClick={markAllPresent}
                    className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-4 py-2 hover:bg-white rounded-xl transition-all shadow-sm border border-indigo-100"
                >
                    Mark All Present
                </button>
            </div>

            <form action={MarkAttendanceAction} className="space-y-6">
                <input type="hidden" name="ProjectMeetingID" value={meeting.ProjectMeetingID} />
                
                <div className="space-y-4">
                    {students.map((student: any) => (
                        <div key={student.StudentID} className="flex flex-col md:flex-row items-center justify-between p-6 bg-white/40 border border-white rounded-3xl group hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300">
                            <input type="hidden" name="StudentIDs" value={student.StudentID} />
                            <input type="hidden" name={`isPresent_${student.StudentID}`} value={String(attendanceData[student.StudentID])} />
                            
                            <div className="flex items-center gap-6 mb-4 md:mb-0">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-all ${attendanceData[student.StudentID] ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'}`}>
                                    {student.StudentName[0]}
                                </div>
                                <div>
                                    <p className="font-black text-[#201E43] text-lg tracking-tight">{student.StudentName}</p>
                                    <p className="text-[10px] font-black text-[#201E43]/30 uppercase tracking-[0.2em]">{student.EnrollmentNo}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <input 
                                        type="text" 
                                        name={`remarks_${student.StudentID}`} 
                                        placeholder="Add audit remarks..." 
                                        className="w-full md:w-48 px-4 py-3 bg-white/60 border border-white/80 rounded-[1.25rem] text-[11px] font-bold text-[#201E43] focus:outline-none focus:ring-4 focus:ring-indigo-100"
                                        value={remarksData[student.StudentID] || ""}
                                        onChange={(e) => handleRemark(student.StudentID, e.target.value)}
                                    />
                                </div>

                                <button 
                                    type="button"
                                    onClick={() => handleToggle(student.StudentID)}
                                    className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 w-full sm:w-28 text-center ${
                                        attendanceData[student.StudentID] 
                                        ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 hover:bg-emerald-500 hover:text-white' 
                                        : 'bg-rose-100 text-rose-600 border border-rose-200 hover:bg-rose-500 hover:text-white'
                                    }`}
                                >
                                    {attendanceData[student.StudentID] ? 'PRESENT' : 'ABSENT'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-10 flex flex-col items-center gap-4">
                     <button 
                        type="submit"
                        className="w-full py-5 bg-[#201E43] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl shadow-[#201E43]/20"
                     >
                         Finalize Audit List
                     </button>
                     <Link href="/faculty/meeting" className="text-[10px] font-black text-[#201E43]/30 uppercase tracking-widest hover:text-indigo-600 transition-colors">Discard and Fallback</Link>
                </div>
            </form>
        </div>
    );
}
