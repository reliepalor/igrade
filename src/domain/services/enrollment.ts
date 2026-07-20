import { enrollmentRepository } from "@/infrastructure/db/repositories/enrollmentRepository";
import { prisma } from "@/infrastructure/db/prisma";

export async function enrollStudentInSubject(studentId: string, subjectId: string) {
  const student = await prisma.user.findUnique({ where: { id: studentId } });
  if (!student || student.role !== "STUDENT") {
    throw new Error("Selected user is not a valid student.");
  }

  const existing = await enrollmentRepository.exists(studentId, subjectId);
  if (existing) {
    throw new Error("Student is already enrolled in this subject.");
  }

  return enrollmentRepository.create(studentId, subjectId);
}

export async function unenrollStudent(studentId: string, subjectId: string) {
  return enrollmentRepository.remove(studentId, subjectId);
}

export async function findStudentByIdentifier(identifier: string) {
  // Teacher searches by Student ID or email
  return prisma.user.findFirst({
    where: {
      role: "STUDENT",
      status: "APPROVED",
      OR: [{ studentId: identifier }, { email: identifier }],
    },
  });
}