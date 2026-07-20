import { gradeRepository } from "@/infrastructure/db/repositories/gradeRepository";
import { enrollmentRepository } from "@/infrastructure/db/repositories/enrollmentRepository";

const MIN_GRADE = 0;
const MAX_GRADE = 100;

export async function recordGrade(
  studentId: string,
  subjectId: string,
  value: number,
  changedById: string
) {
  if (value < MIN_GRADE || value > MAX_GRADE) {
    throw new Error(`Grade must be between ${MIN_GRADE} and ${MAX_GRADE}.`);
  }

  const enrolled = await enrollmentRepository.exists(studentId, subjectId);
  if (!enrolled) {
    throw new Error("Student is not enrolled in this subject.");
  }

  const existing = await gradeRepository.findByStudentAndSubject(studentId, subjectId);
  const oldValue = existing?.value ?? null;

  const grade = await gradeRepository.upsert(studentId, subjectId, value);
  await gradeRepository.createHistory(grade.id, oldValue, value, changedById);

  return grade;
}