import { prisma } from '@/app/lib/prisma'
import AdminViewEdit from '@/app/admin/adminlist/component/AdminViewEdit';

async function DetailAdmin({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const data = await prisma.staff.findFirst({ where: { StaffID: Number(id) } });

  if (!data) return <div className="min-h-screen flex items-center justify-center font-sans text-[#201E43] font-black">Admin Not Found</div>;

  return <AdminViewEdit data={data} mode="view" />;
}

export default DetailAdmin;
