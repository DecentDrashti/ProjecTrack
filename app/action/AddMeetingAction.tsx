'use server';

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function AddMeetingAction(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) throw new Error("Unauthorized");

    let facultyEmail: string;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        facultyEmail = decoded.id; // Corrected: payload.id is identifier (email for faculty)
    } catch (error) {
        throw new Error("Invalid session");
    }

    const faculty = await prisma.staff.findFirst({
        where: { Email: facultyEmail }
    });

    if (!faculty) throw new Error("Faculty not found");

    const projectGroupId = parseInt(formData.get('ProjectGroupID') as string);
    const meetingDateTime = new Date(formData.get('MeetingDateTime') as string);
    const purpose = formData.get('MeetingPurpose') as string;
    const location = formData.get('MeetingLocation') as string;
    const notes = formData.get('MeetingNotes') as string;

    await prisma.projectmeeting.create({
        data: {
            ProjectGroupID: projectGroupId,
            GuideStaffID: faculty.StaffID,
            MeetingDateTime: meetingDateTime,
            MeetingPurpose: purpose,
            MeetingLocation: location,
            MeetingNotes: notes,
            MeetingStatus: "SCHEDULED",
            Created: new Date()
        }
    });

    redirect("/faculty/meeting");
}
