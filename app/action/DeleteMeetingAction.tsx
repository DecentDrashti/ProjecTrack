'use server';

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteMeetingAction(meetingId: number) {
    if (!meetingId) throw new Error("ID is required");

    await prisma.projectmeeting.delete({
        where: { ProjectMeetingID: meetingId }
    });

    revalidatePath("/faculty/meeting");
}
