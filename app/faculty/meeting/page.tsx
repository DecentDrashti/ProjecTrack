//import { users } from '@/lib/generated/prisma/browser'; 
import { prisma } from '@/app/lib/prisma'; 
import React from 'react' 
import { projectmeeting } from '../../generated/prisma/client';
 
async function MeetingList() { 
    const data = await prisma.projectmeeting.findMany(); 
  return ( 
    <table className="min-w-full border border-gray-300 text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border-b">Meeting ID</th>
          <th className="px-4 py-2 border-b">Location</th>
          <th className="px-4 py-2 border-b">Purpose</th>
        </tr>
      </thead>
      <tbody>
        {data.map((u:projectmeeting) => (
          <tr key={u.ProjectMeetingID} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{u.ProjectMeetingID}</td>
            <td className="px-4 py-2 border-b">{u.MeetingLocation}</td>
            <td className="px-4 py-2 border-b">{u.MeetingPurpose}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default async function Page() { 
  return ( 
    <div> 
      <h1>Meeting List</h1> 
      <MeetingList/> 
    </div> 
  ); 
}