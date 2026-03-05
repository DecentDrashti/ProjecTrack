import { prisma } from '@/app/lib/prisma';
import { UpdateFacultyAction } from '@/app/action/UpdateFacultyAction';
import FacultyViewEdit from '@/app/admin/faculty/component/FacultyViewEdit';

export default async function EditFaculty({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await prisma.staff.findFirst({ where: { StaffID: Number(id) } });

    if (!data) return <div className="min-h-screen flex items-center justify-center font-sans text-[#201E43] font-black">Faculty record not found</div>;

    return <FacultyViewEdit data={data} mode="edit" action={UpdateFacultyAction} />;
}
