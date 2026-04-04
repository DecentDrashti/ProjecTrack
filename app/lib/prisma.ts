// import { PrismaClient } from "@prisma/client";

// // This tells TypeScript that 'prisma' might exist on the global object
// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// // We create a single instance of Prisma. 
// // It will automatically use the DATABASE_URL from your .env or Vercel settings.
// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query"], 
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;
// import { PrismaClient } from "@prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb"; 

// const globalForPrisma = global;

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient();

// if (process.env.NODE_ENV !== "production")
//   globalForPrisma.prisma = prisma;
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