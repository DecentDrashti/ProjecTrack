import { NextRequest, NextResponse } from "next/server"; // Use NextRequest for better typing
import { prisma } from "@/app/lib/prisma";

// 1. Update the signature: context is the second argument, and params is a Promise
export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ meetingId: string }> } 
) {
    try {
        // 2. You MUST await the params before accessing meetingId
        const resolvedParams = await params;
        const meetingId = parseInt(resolvedParams.meetingId);

        const meeting = await prisma.projectmeeting.findUnique({
            where: { ProjectMeetingID: meetingId },
            include: {
                projectgroup: true
            }
        });

        if (!meeting) {
            return NextResponse.json({ message: "Meeting not found" }, { status: 404 });
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

        return NextResponse.json({
            meeting,
            students,
            attendance
        });
    } catch (error) {
        console.error("API_ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}