"use server" 
 
import { prisma } from "@/app/lib/prisma"; 
import { revalidatePath } from "next/cache"; 
import { redirect } from "next/navigation"; 
 
async function AddStudentAction(formData: FormData){ 
    // console.log(formData) 
    // const StudentID = formData.get("StudentID") as string;
    const StudentName = formData.get("StudentName") as string; 
    const EnrollmentNo= formData.get("EnrollmentNo") as string;
    const Email = formData.get("Email") as string;
    const Phone = formData.get("Phone") as string;
    const Description = formData.get("Description") as string;
    const Password = formData.get("Password") as string; 
 
    const data = {StudentName, EnrollmentNo, Email, Phone, Description, Password}; 
 
    await prisma.student.create({data}); 
 
    revalidatePath("/admin/students"); 
    redirect("/admin/students") 
} 
 
export {AddStudentAction} ;