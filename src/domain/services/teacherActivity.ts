import { prisma } from "@/infrastructure/db/prisma";

export async function getTeacherActivitySummary() {
  const teachers = await prisma.user.findMany({
    where: { role: "TEACHER", status: "APPROVED" },
    include: {
      academicYears: {
        include: {
          terms: {
            include: {
              classes: {
                include: {
                  subjects: {
                    include: { enrollments: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return teachers.map((teacher) => {
    let classCount = 0;
    let subjectCount = 0;
    const studentIds = new Set<string>();

    for (const year of teacher.academicYears) {
      for (const term of year.terms) {
        for (const cls of term.classes) {
          classCount++;
          for (const subject of cls.subjects) {
            subjectCount++;
            for (const enrollment of subject.enrollments) {
              studentIds.add(enrollment.studentId);
            }
          }
        }
      }
    }

    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      teacherEmail: teacher.email,
      classCount,
      subjectCount,
      studentCount: studentIds.size,
    };
  });
}