import React from 'react';
import { prisma } from '@/app/lib/prisma';
import AttendanceForm from '@/app/components/attendance/AttendanceForm';

// 1. Updated: params must be typed as a Promise
export default async function MeetingAttendancePage({ 
    params 
}: { 
    params: Promise<{ meetingId: string }> 
}) {
    // 2. Updated: You MUST await params before accessing meetingId
    const { meetingId: rawMeetingId } = await params;
    const meetingId = parseInt(rawMeetingId);

    // Fetch meeting details directly in server component
    const meeting = await prisma.projectmeeting.findUnique({
        where: { ProjectMeetingID: meetingId },
        include: {
            projectgroup: true
        }
    });

    if (!meeting) {
        return (
            <div className="p-20 text-center font-black text-rose-500 uppercase tracking-widest">
                Meeting Archive Missing
            </div>
        );
    }

    // Fetch all students in that project group
    const groupMembers = await prisma.projectgroupmember.findMany({
        where: { ProjectGroupID: meeting.ProjectGroupID },
        include: {
            student: true
        }
    });

    const students = groupMembers.map(gm => gm.student);

    // Fetch existing attendance records
    const attendance = await prisma.projectmeetingattendance.findMany({
        where: { ProjectMeetingID: meetingId }
    });

    return (
        <div className="min-h-screen bg-[#EDF0F5] pb-20 p-6 lg:p-10 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-[#201E43] tracking-tighter uppercase mb-2 leading-none">
                            Audit Engagement
                        </h1>
                        <p className="text-[#201E43]/40 font-bold uppercase tracking-[0.2em] text-[11px] mt-2">
                            Research Group: <span className="text-[#201E43]">{meeting.projectgroup.ProjectGroupName}</span> • {new Date(meeting.MeetingDateTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>

                {/* Pass data to the client-side form for interactivity */}
                <AttendanceForm 
                    meeting={meeting} 
                    students={students} 
                    initialAttendance={attendance} 
                />
            </div>
        </div>
    );
}