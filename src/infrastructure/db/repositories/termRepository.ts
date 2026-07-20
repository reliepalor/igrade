import { prisma } from "@/infrastructure/db/prisma";
import { TermName } from "@/generated/prisma/enums";
export const termRepository = {
  create(academicYearId: string, name: TermName) {
    return prisma.term.create({ data: { academicYearId, name } });
  },
  findByAcademicYear(academicYearId: string) {
    return prisma.term.findMany({
      where: { academicYearId },
      include: { classes: true },
    });
  },
  findById(id: string) {
    return prisma.term.findUnique({ where: { id } });
  },
};