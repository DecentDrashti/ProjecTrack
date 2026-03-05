import { prisma } from '@/app/lib/prisma'
import FacultyViewEdit from '@/app/admin/faculty/component/FacultyViewEdit';

async function DetailFaculty({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const data = await prisma.staff.findFirst({ where: { StaffID: Number(id) } });

  if (!data) return <div className="min-h-screen flex items-center justify-center font-sans text-[#201E43] font-black">Faculty Not Found</div>;

  return <FacultyViewEdit data={data} mode="view" />;
}

export default DetailFaculty;
