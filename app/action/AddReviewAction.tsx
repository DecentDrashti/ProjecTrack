"use server"

import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function AddReviewAction(formData: FormData){

  const ProjectGroupID = Number(formData.get("ProjectGroupID"))
  const ProgressPercent = Number(formData.get("ProgressPercent"))
  const ProgressSummary = formData.get("ProgressSummary") as string
  const Remark = formData.get("Remark") as string

  // 1. Get the project and select the ID you need
  const project = await prisma.projectgroup.findUnique({
    where: { ProjectGroupID },
    select: { ConvenerStaffID: true }
  })

  // 2. Error handling for missing project OR missing Convener
  if (!project) {
    throw new Error("Project not found")
  }

  if (!project.ConvenerStaffID) {
    throw new Error("This project does not have an assigned Convener/Guide.")
  }

  // 3. Create review (TypeScript now knows ConvenerStaffID is a number)
  await prisma.projectreview.create({
    data:{
      ProjectGroupID,
      GuideStaffID: project.ConvenerStaffID, 
      ProgressPercent,
      ProgressSummary,
      Remark
    }
  })

  revalidatePath("/faculty/review")
  redirect(`/faculty/review/`)
}

export { AddReviewAction }