import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: { meetingId: string } }) {
    const meetingId = parseInt(params.meetingId);

    const meeting = await prisma.projectmeeting.findUnique({
        where: { ProjectMeetingID: meetingId },
        include: {
            projectgroup: true
        }
    });

    if (!meeting) return NextResponse.json({ message: "Meeting not found" }, { status: 404 });

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

    return NextResponse.json({
        meeting,
        students,
        attendance
    });
}
