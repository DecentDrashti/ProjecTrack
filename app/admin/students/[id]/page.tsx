import { prisma } from '@/app/lib/prisma' 
import Link from 'next/link'; 
import React from 'react' 

async function DetailStudent({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const data = await prisma.student .findFirst({ where: { StudentID: Number(id) } } );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {data?.StudentName || 'Student Not Found'}
        </h1>

        {/* Student Details */}
        {data ? (
          <div className="space-y-3">
            <p className="text-gray-600">
              <span className="font-semibold">Student ID:</span> {data.StudentID}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Enrollment No:</span> {data.EnrollmentNo}
            </p>
            <p className="text-gray-600">
                <span className="font-semibold">Student Name:</span> {data.StudentName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {data.Email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span> {data.Phone}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Description:</span> {data.Description || 'N/A'}
            </p>
             <p className="text-gray-600">
              <span className="font-semibold">Password:</span> {data.Password}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Created At:</span> {data.Created?.toLocaleString()}
            </p>
                <p className="text-gray-600">
                <span className="font-semibold">Updated At:</span> {data.Modified?.toLocaleString()}
            </p>
            {/* Add more fields if you have them */}
          </div>
        ) : (
          <p className="text-red-500 text-center">No student found with this ID.</p>
        )}

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/admin/students"
            className="inline-block px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Back to Students
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailStudent;
