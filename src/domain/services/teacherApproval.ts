import { prisma } from "@/infrastructure/db/prisma";

export async function getPendingTeachers() {
  return prisma.user.findMany({
    where: { role: "TEACHER", status: "PENDING" },
    orderBy: { createdAt: "asc" },
  });
}

export async function approveTeacher(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { status: "APPROVED" },
  });
}

export async function rejectTeacher(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { status: "REJECTED" },
  });
}