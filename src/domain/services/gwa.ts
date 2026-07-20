import { gradeRepository } from "@/infrastructure/db/repositories/gradeRepository";

const IMPROVEMENT_THRESHOLD = 75;

type GradeWithRelations = Awaited<ReturnType<typeof gradeRepository.findAllByStudent>>[number];

export async function calculateOverallGWA(studentId: string) {
  const grades = await gradeRepository.findAllByStudent(studentId);
  if (grades.length === 0) return null;

  const sum = grades.reduce((acc: number, g: GradeWithRelations) => acc + g.value, 0);
  return Math.round((sum / grades.length) * 100) / 100;
}

export async function calculateGWAByTerm(studentId: string) {
  const grades = await gradeRepository.findAllByStudent(studentId);

  const byTerm = new Map<string, { termLabel: string; values: number[] }>();

  for (const grade of grades) {
    const term = grade.subject.class.term;
    const year = term.academicYear;
    const key = `${year.label}-${term.name}`;
    const termLabel = `${term.name} Term (${year.label})`;

    if (!byTerm.has(key)) {
      byTerm.set(key, { termLabel, values: [] });
    }
    byTerm.get(key)!.values.push(grade.value);
  }

  return Array.from(byTerm.values()).map(({ termLabel, values }) => ({
    termLabel,
    gwa: Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100,
  }));
}

export async function getSubjectsNeedingImprovement(studentId: string) {
  const grades = await gradeRepository.findAllByStudent(studentId);

  return grades
    .filter((g) => g.value < IMPROVEMENT_THRESHOLD)
    .map((g) => ({
      subjectName: g.subject.name,
      value: g.value,
      termLabel: `${g.subject.class.term.name} Term (${g.subject.class.term.academicYear.label})`,
    }));
}