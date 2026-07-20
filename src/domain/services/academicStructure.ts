import { academicYearRepository } from "@/infrastructure/db/repositories/academicYearRepository";
import { termRepository } from "@/infrastructure/db/repositories/termRepository";
import { classRepository } from "@/infrastructure/db/repositories/classRepository";
import { subjectRepository } from "@/infrastructure/db/repositories/subjectRepository";
import { TermName } from "@/generated/prisma/enums";
export async function createAcademicYear(teacherId: string, label: string) {
  if (!label.trim()) throw new Error("Academic year label is required.");
  return academicYearRepository.create(teacherId, label.trim());
}

export async function createTerm(academicYearId: string, name: TermName) {
  return termRepository.create(academicYearId, name);
}

export async function createClass(termId: string, name: string) {
  if (!name.trim()) throw new Error("Class name is required.");
  return classRepository.create(termId, name.trim());
}

export async function createSubject(classId: string, name: string, code: string) {
  if (!name.trim() || !code.trim()) {
    throw new Error("Subject name and code are required.");
  }
  return subjectRepository.create(classId, name.trim(), code.trim().toUpperCase());
}

export async function getTeacherAcademicYears(teacherId: string) {
  return academicYearRepository.findByTeacher(teacherId);
}