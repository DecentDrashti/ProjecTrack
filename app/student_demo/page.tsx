//import { users } from '@/lib/generated/prisma/browser'; 
import { prisma } from '@/app/lib/prisma'; 
import React from 'react' 
import { staff, student } from '../generated/prisma/client';
 
async function StudentList() { 
    const data = await prisma.staff.findMany(); 
     console.log(data);
  return ( 
    <table className="min-w-full border border-gray-300 text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border-b">Student ID</th>
          <th className="px-4 py-2 border-b">Name</th>
          <th className="px-4 py-2 border-b">Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((u: staff) => (
          <tr key={u.StaffID} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{u.StaffID}</td>
            <td className="px-4 py-2 border-b">{u.StaffName}</td>
            <td className="px-4 py-2 border-b">{u.Email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
//     <div>  
//         <ul> 
//       {data.map((u: student) => (
//     <li key={u.StudentID}>
//       <div>{u.StudentName}</div>
//       <div>{u.Email}</div>
//     </li>
//       ))}
//       </ul> 
//     </div>
//   );
// }
export default async function Page() { 
  return ( 
    <div> 
      <h1>Student List</h1> 
      <StudentList/> 
    </div> 
  ); 
}