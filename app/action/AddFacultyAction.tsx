"use server" 
 
import { prisma } from "@/app/lib/prisma"; 
import { revalidatePath } from "next/cache"; 
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt'; // 1. Import bcrypt 
 
async function AddFacultyAction(formData: FormData){ 
    // console.log(formData) 
    // const StudentID = formData.get("StudentID") as string;
    const StaffName = formData.get("StaffName") as string; 
    const Email = formData.get("Email") as string;
    const Phone = formData.get("Phone") as string;
    //const Description = formData.get("Description") as string;
    const Password = formData.get("Password") as string; 
    // 👇 Make description optional
    const DescriptionRaw = formData.get("Description") as string;
    const Description = DescriptionRaw?.trim() || null;
    const role = formData.get("role") as string;
    
    // 2. 🛡️ Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const data = {StaffName, Email, Phone, Description, Password:hashedPassword, Role: role}; 
 
    await prisma.staff.create({data}); 
 
    revalidatePath("/admin/faculty"); 
    redirect("/admin/faculty") 
} 
 
export {AddFacultyAction} ;