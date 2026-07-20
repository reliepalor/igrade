import { prisma } from "@/infrastructure/db/prisma";

export const classRepository = {
  create(termId: string, name: string) {
    return prisma.class.create({ data: { termId, name } });
  },
  findByTerm(termId: string) {
    return prisma.class.findMany({
      where: { termId, archived: false },
      include: { subjects: true },
    });
  },
  findById(id: string) {
    return prisma.class.findUnique({ where: { id } });
  },
  archive(id: string) {
    return prisma.class.update({ where: { id }, data: { archived: true } });
  },
};