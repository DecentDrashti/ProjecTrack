import { PrismaMariaDb } from "@prisma/adapter-mariadb"; 
import { PrismaClient } from "@/app/generated/prisma/client"; 

const globalForPrisma = global as unknown as { prisma: PrismaClient };
 
const adapter = new PrismaMariaDb({ 
    host:"localhost", 
    port:3306, 
    user:"root", 
    password:"", 
    database:"project_track_db", 
    connectionLimit:5 
}) 
 
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;