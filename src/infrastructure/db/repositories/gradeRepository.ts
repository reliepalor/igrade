import { prisma } from "@/infrastructure/db/prisma";

export const gradeRepository = {
  findByStudentAndSubject(studentId: string, subjectId: string) {
    return prisma.grade.findUnique({
      where: { studentId_subjectId: { studentId, subjectId } },
    });
  },
  findAllByStudent(studentId: string) {
    return prisma.grade.findMany({
      where: { studentId },
      include: {
        subject: {
          include: { class: { include: { term: { include: { academicYear: true } } } } },
        },
      },
    });
  },
  upsert(studentId: string, subjectId: string, value: number) {
    return prisma.grade.upsert({
      where: { studentId_subjectId: { studentId, subjectId } },
      update: { value },
      create: { studentId, subjectId, value },
    });
  },
  createHistory(gradeId: string, oldValue: number | null, newValue: number, changedById: string) {
    return prisma.gradeHistory.create({
      data: { gradeId, oldValue, newValue, changedById },
    });
  },
};