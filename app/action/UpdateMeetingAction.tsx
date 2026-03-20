'use server';

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function UpdateMeetingAction(formData: FormData) {
    const meetingId = parseInt(formData.get('ProjectMeetingID') as string);
    const projectGroupId = parseInt(formData.get('ProjectGroupID') as string);
    const meetingDateTime = new Date(formData.get('MeetingDateTime') as string);
    const purpose = formData.get('MeetingPurpose') as string;
    const location = formData.get('MeetingLocation') as string;
    const notes = formData.get('MeetingNotes') as string;
    const status = formData.get('MeetingStatus') as string;

    await prisma.projectmeeting.update({
        where: { ProjectMeetingID: meetingId },
        data: {
            ProjectGroupID: projectGroupId,
            MeetingDateTime: meetingDateTime,
            MeetingPurpose: purpose,
            MeetingLocation: location,
            MeetingNotes: notes,
            MeetingStatus: status,
            Modified: new Date()
        }
    });

    redirect("/faculty/meeting");
}
