import { prisma } from '@/app/lib/prisma';
import { UpdateStudentAction } from '@//app/action/UpdateStudentAction';
import StudentViewEdit from '@/app/admin/students/component/StudentViewEdit';

export default async function EditStudent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await prisma.student.findFirst({ where: { StudentID: Number(id) } });

  if (!data) return <div>Student not found</div>;

  // TEST THIS:
  return <StudentViewEdit data={data} mode="edit" action={UpdateStudentAction} />;
}