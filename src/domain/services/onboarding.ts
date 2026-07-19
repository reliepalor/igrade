import { prisma } from "@/infrastructure/db/prisma";

export async function completeStudentOnboarding(userId: string, studentId: string) {
  const existing = await prisma.user.findUnique({ where: { studentId } });
  if (existing) {
    throw new Error("This Student ID is already registered.");
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      role: "STUDENT",
      studentId,
      status: "APPROVED", // students are auto-approved
      onboardingCompleted: true,
    },
  });
}

export async function completeTeacherOnboarding(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      role: "TEACHER",
      status: "PENDING", // requires admin approval
      onboardingCompleted: true,
    },
  });
}