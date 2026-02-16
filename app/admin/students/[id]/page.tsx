import { prisma } from '@/app/lib/prisma';
import StudentViewEdit from '@/app/admin/students/component/StudentViewEdit';

async function DetailStudent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await prisma.student.findFirst({ where: { StudentID: Number(id) } });

  if (!data) return <div>Student Not Found</div>;

  // TEST THIS:
  return <StudentViewEdit data={data} mode="view" />;
}

export default DetailStudent;