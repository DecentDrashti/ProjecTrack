'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DeleteMeetingAction } from '@/app/action/DeleteMeetingAction';

interface MeetingActionsProps {
    meetingId: number;
}

export default function MeetingActions({ meetingId }: MeetingActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this meeting? This action cannot be undone.")) {
            setIsDeleting(true);
            try {
                await DeleteMeetingAction(meetingId);
            } catch (error) {
                alert("Failed to delete meeting");
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link 
                href={`/faculty/meeting/attendance/${meetingId}`}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#201E43] hover:text-white text-[#201E43] rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm border border-[#201E43]/10 text-center"
            >
                Mark Attendance
            </Link>
            <div className="flex gap-2">
                <Link 
                    href={`/faculty/meeting/edit/${meetingId}`}
                    className="p-3 bg-white/60 hover:bg-[#201E43] hover:text-white text-[#201E43]/40 rounded-2xl border border-white/80 shadow-sm transition-all duration-300" 
                    title="Modify Meeting"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
                    </svg>
                </Link>
                <button 
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`p-3 bg-white/60 hover:bg-rose-500 hover:text-white rounded-2xl border border-white/80 shadow-sm transition-all duration-300 ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'text-rose-500/40'}`} 
                    title="Cancel Meeting"
                >
                    {isDeleting ? (
                       <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full"></div>
                    ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                       </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
