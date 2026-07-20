import { prisma } from "@/infrastructure/db/prisma";

export const subjectRepository = {
  create(classId: string, name: string, code: string) {
    return prisma.subject.create({ data: { classId, name, code } });
  },
  findByClass(classId: string) {
    return prisma.subject.findMany({
      where: { classId, archived: false },
      include: { enrollments: { include: { student: true } } },
    });
  },
  findById(id: string) {
    return prisma.subject.findUnique({
      where: { id },
      include: { class: { include: { term: { include: { academicYear: true } } } } },
    });
  },
  archive(id: string) {
    return prisma.subject.update({ where: { id }, data: { archived: true } });
  },
};