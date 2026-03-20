'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface MeetingCalendarProps {
    meetingDates: string[]; // ISO Strings of dates with meetings
}

export default function MeetingCalendar({ meetingDates }: MeetingCalendarProps) {
    const router = useRouter();
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const monthName = today.toLocaleString('default', { month: 'long' });

    const isMeetingDay = (day: number) => {
        const d = new Date(currentYear, currentMonth, day);
        const iso = d.toISOString().split('T')[0];
        return meetingDates.some(md => md.split('T')[0] === iso);
    };

    const isToday = (day: number) => {
        return day === today.getDate();
    };

    const handleDateClick = (day: number) => {
        const d = new Date(currentYear, currentMonth, day);
        // Correct for timezone to get the date in YYYY-MM-DD
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const date = String(d.getDate()).padStart(2, '0');
        router.push(`/faculty/meeting/add?date=${year}-${month}-${date}`);
    };

    return (
        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-8 shadow-2xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-[12px] font-black text-[#201E43]/60 uppercase tracking-[0.2em]">{monthName} {currentYear}</h3>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#201E43]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/30"></div>
                </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {['S','M','T','W','T','F','S'].map(d => (
                    <div key={d} className="text-[9px] font-black text-[#201E43]/30 uppercase">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-3">
                {/* Empty slots for first day offset */}
                {[...Array(firstDayOfMonth)].map((_, i) => (
                    <div key={`empty-${i}`} className="h-10"></div>
                ))}

                {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const hasMeeting = isMeetingDay(day);
                    const todayAtDay = isToday(day);

                    return (
                        <div 
                            key={day} 
                            onClick={() => handleDateClick(day)}
                            className={`relative h-11 rounded-[1.25rem] flex items-center justify-center text-[11px] font-black transition-all cursor-pointer hover:scale-110 active:scale-95 group ${
                                todayAtDay 
                                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 ring-4 ring-indigo-600/20' 
                                : 'text-[#201E43]/60 bg-white/40 border border-white/80 hover:bg-white hover:text-indigo-600'
                            }`}
                        >
                            {day}
                            {hasMeeting && (
                                <div className={`absolute bottom-1.5 w-1 h-1 rounded-full ${todayAtDay ? 'bg-white' : 'bg-indigo-600'}`}></div>
                            )}
                            
                            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-4 h-4 rounded-full bg-[#201E43] flex items-center justify-center text-[8px] text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
