"use server" 
 
import { prisma } from "@/app/lib/prisma"; 
import { revalidatePath } from "next/cache"; 
import { redirect } from "next/navigation"; 
import bcrypt from 'bcrypt'; // 1. Import bcrypt
 
async function AddStudentAction(formData: FormData){ 
    // console.log(formData) 
    // const StudentID = formData.get("StudentID") as string;
    const StudentName = formData.get("StudentName") as string; 
    const EnrollmentNo= formData.get("EnrollmentNo") as string;
    const Email = formData.get("Email") as string;
    const Phone = formData.get("Phone") as string;
    //const Description = formData.get("Description") as string;
    const Password = formData.get("Password") as string; 
    // 👇 Make description optional
    const DescriptionRaw = formData.get("Description") as string;
    const Description = DescriptionRaw?.trim() || null;
    
    // 2. 🛡️ Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const data = {StudentName, EnrollmentNo, Email, Phone, Description, Password:hashedPassword}; 
 
    await prisma.student.create({data}); 
 
    revalidatePath("/admin/students"); 
    redirect("/admin/students") 
} 
 
export {AddStudentAction} ;