'use server';

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function AddProjectGroupAction(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) throw new Error("Unauthorized");

    let facultyEmail: string;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        facultyEmail = decoded.id; 
    } catch (e) {
        throw new Error("Invalid session");
    }

    const faculty = await prisma.staff.findFirst({
        where: { Email: facultyEmail }
    });

    if (!faculty) throw new Error("Faculty not found");

    const title = formData.get('ProjectTitle') as string;
    const groupName = formData.get('ProjectGroupName') as string;
    const typeId = parseInt(formData.get('ProjectTypeID') as string);
    const area = formData.get('ProjectArea') as string;
    const desc = formData.get('ProjectDescription') as string;
    const studentIds = formData.getAll('StudentIDs').map(id => parseInt(id as string));

    if (studentIds.length === 0) {
        throw new Error("Select at least one student");
    }

    // Use transaction to ensure group and members are created together
    await prisma.$transaction(async (tx) => {
        const group = await tx.projectgroup.create({
            data: {
                ProjectTitle: title,
                ProjectGroupName: groupName,
                ProjectTypeID: typeId,
                ProjectArea: area,
                ProjectDescription: desc,
                GuideStaffName: faculty.StaffName,
                ProjectStatus: "PROPOSED",
                Created: new Date()
            }
        });

        // Insert group members
        const memberData = studentIds.map(sid => ({
            ProjectGroupID: group.ProjectGroupID,
            StudentID: sid,
            Created: new Date()
        }));

        await tx.projectgroupmember.createMany({
            data: memberData
        });
    });

    redirect("/faculty/project");
}
