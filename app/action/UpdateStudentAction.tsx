"use server" 
 
import { prisma } from "@/app/lib/prisma"; 
import { revalidatePath } from "next/cache"; 
import { redirect } from "next/navigation"; 
 
async function UpdateStudentAction(formData: FormData){ 
    // console.log(formData) 
 
    const StudentName = formData.get("StudentName") as string; 
    const Password = formData.get("Password") as string;
    // const StudentID = formData.get("StudentID") as string;
    const EnrollmentNo = formData.get("EnrollmentNo") as string;
    const Phone = formData.get("Phone") as string;
    const Email = formData.get("Email") as string;
    const Description = formData.get("Description") as string;
    const data = {StudentName, Password, EnrollmentNo, Phone, Email, Description}; 

    await prisma.student.update({where: {StudentID: Number(formData.get("StudentID"))}, data}); 

    revalidatePath("/admin/students"); 
    redirect("/admin/students") 
} 
 
export {UpdateStudentAction} ;