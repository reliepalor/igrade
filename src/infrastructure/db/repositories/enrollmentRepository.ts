import { prisma } from "@/infrastructure/db/prisma";

export const enrollmentRepository = {
  create(studentId: string, subjectId: string) {
    return prisma.enrollment.create({ data: { studentId, subjectId } });
  },
  findByStudent(studentId: string) {
    return prisma.enrollment.findMany({
      where: { studentId },
      include: {
        subject: {
          include: { class: { include: { term: { include: { academicYear: true } } } } },
        },
      },
    });
  },
  exists(studentId: string, subjectId: string) {
    return prisma.enrollment.findUnique({
      where: { studentId_subjectId: { studentId, subjectId } },
    });
  },
  remove(studentId: string, subjectId: string) {
    return prisma.enrollment.delete({
      where: { studentId_subjectId: { studentId, subjectId } },
    });
  },
};