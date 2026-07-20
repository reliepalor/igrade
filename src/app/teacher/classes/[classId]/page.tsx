import { requireRole } from "@/lib/auth/guards";
import { prisma } from "@/infrastructure/db/prisma";
import { addSubject } from "./actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ClassPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  await requireRole("TEACHER");
  const { classId } = await params;

  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: {
      subjects: { include: { enrollments: true } },
      term: true,
    },
  });

  if (!cls) notFound();

  const addSubjectWithClass = addSubject.bind(null, classId);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <Link href={`/teacher/terms/${cls.termId}`} className="text-sm text-[#2B3A67]">
        ← Back to Term
      </Link>
      <h1 className="mt-2 text-xl font-semibold text-[#1C2321]">{cls.name}</h1>

      <form action={addSubjectWithClass} className="mt-6 flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="e.g. General Mathematics"
          required
          className="flex-1 rounded border px-3 py-2 text-sm"
        />
        <input
          type="text"
          name="code"
          placeholder="e.g. MATH101"
          required
          className="w-32 rounded border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded bg-[#1C2321] px-4 py-2 text-sm font-medium text-white hover:bg-[#2B3A67]"
        >
          Add Subject
        </button>
      </form>

      <div className="mt-8 space-y-2">
        {cls.subjects.length === 0 && (
          <p className="text-sm text-[#1C2321]/40">No subjects yet.</p>
        )}
        {cls.subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/teacher/subjects/${subject.id}`}
            className="block rounded border p-4 text-sm hover:bg-[#FAFAF8]"
          >
            <span className="font-medium">{subject.name}</span>
            <span className="ml-2 text-[#1C2321]/40">({subject.code})</span>
            <span className="ml-2 text-[#1C2321]/40">
              — {subject.enrollments.length} student{subject.enrollments.length !== 1 ? "s" : ""}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}