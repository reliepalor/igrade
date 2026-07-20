import { prisma } from "@/infrastructure/db/prisma";

export const academicYearRepository = {
  create(teacherId: string, label: string) {
    return prisma.academicYear.create({ data: { teacherId, label } });
  },
  findByTeacher(teacherId: string) {
    return prisma.academicYear.findMany({
      where: { teacherId, archived: false },
      orderBy: { createdAt: "desc" },
      include: { terms: true },
    });
  },
  findById(id: string) {
    return prisma.academicYear.findUnique({ where: { id } });
  },
};