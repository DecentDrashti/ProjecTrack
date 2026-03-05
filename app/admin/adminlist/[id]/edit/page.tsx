import { prisma } from '@/app/lib/prisma';
import { UpdateAdminAction } from '@/app/action/UpdateAdminAction';
import AdminViewEdit from '@/app/admin/adminlist/component/AdminViewEdit';

export default async function EditAdmin({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await prisma.staff.findFirst({ where: { StaffID: Number(id) } });

    if (!data) return <div className="min-h-screen flex items-center justify-center font-sans text-[#201E43] font-black">Admin record not found</div>;

    return <AdminViewEdit data={data} mode="edit" action={UpdateAdminAction} />;
}
