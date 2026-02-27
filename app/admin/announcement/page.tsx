import { prisma } from "@//app/lib/prisma";
import React from "react";
import { announcement } from "../../generated/prisma/client";
export default async function Announcement() {
    const data = await prisma.announcement .findMany();
    console.log(data);
    return (
        <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border-b">Title</th>
                    <th className="px-4 py-2 border-b">Content</th>
                    <th className="px-4 py-2 border-b">Author</th>
                    <th className="px-4 py-2 border-b">Date</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((a:announcement) => (
                    <tr key={a.AnnouncementID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{a.Title}</td>
                        <td className="px-4 py-2 border-b">{a.Message}</td>
                        <td className="px-4 py-2 border-b">{a.CreatedByRole}</td>
                        {/* <td className="px-4 py-2 border-b">{new Date(a.created).toLocaleDateString()}</td> */}
                        <td className="px-4 py-2 border-b">
                            <button className="text-blue-500 hover:underline">Edit</button>
                            <button className="text-red-500 hover:underline ml-2">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
    );
}
