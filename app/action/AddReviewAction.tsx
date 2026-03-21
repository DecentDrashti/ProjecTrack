"use server"

import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!;

async function AddReviewAction(formData: FormData){
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) throw new Error("Unauthorized");

  let facultyEmail: string;
  try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      facultyEmail = decoded.id; // Identifier (email for faculty)
  } catch (error) {
      throw new Error("Invalid session");
  }

  const faculty = await prisma.staff.findFirst({
      where: { Email: facultyEmail }
  });

  if (!faculty) throw new Error("Faculty not found");

  const ProjectGroupID = Number(formData.get("ProjectGroupID"))
  const ProgressPercent = Number(formData.get("ProgressPercent"))
  const ProgressSummary = formData.get("ProgressSummary") as string
  const Remark = formData.get("Remark") as string

  // 1. Create review using logged-in faculty's StaffID
  await prisma.projectreview.create({
    data:{
      ProjectGroupID,
      GuideStaffID: faculty.StaffID, 
      ProgressPercent,
      ProgressSummary,
      Remark,
      Created: new Date()
    }
  })

  revalidatePath("/faculty/review")
  redirect(`/faculty/review/`)
}

export { AddReviewAction }