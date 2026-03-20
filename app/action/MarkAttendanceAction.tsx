'use server';

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function MarkAttendanceAction(formData: FormData) {
    const meetingId = parseInt(formData.get('ProjectMeetingID') as string);
    const studentIds = formData.getAll('StudentIDs').map(id => parseInt(id as string));

    for (const studentId of studentIds) {
        const isPresent = formData.get(`isPresent_${studentId}`) === 'true';
        const remarks = formData.get(`remarks_${studentId}`) as string;

        // Use upsert to handle create/update automatically
        // Note: ProjectMeetingID + StudentID is unique as per rules
        await prisma.projectmeetingattendance.upsert({
            where: {
                ProjectMeetingID_StudentID: {
                    ProjectMeetingID: meetingId,
                    StudentID: studentId
                }
            },
            update: {
                IsPresent: isPresent,
                AttendanceRemarks: remarks,
                Modified: new Date()
            },
            create: {
                ProjectMeetingID: meetingId,
                StudentID: studentId,
                IsPresent: isPresent,
                AttendanceRemarks: remarks,
                Created: new Date(),
                Modified: new Date()
            }
        });
    }

    // Update meeting status to COMPLETED if attendance was marked
    await prisma.projectmeeting.update({
        where: { ProjectMeetingID: meetingId },
        data: { MeetingStatus: 'COMPLETED' }
    });

    redirect("/faculty/meeting");
}
