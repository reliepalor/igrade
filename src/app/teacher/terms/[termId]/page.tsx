import { requireRole } from "@/lib/auth/guards";
import { prisma } from "@/infrastructure/db/prisma";
import { addClass } from "./actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TermPage({
  params,
}: {
  params: Promise<{ termId: string }>;
}) {
  await requireRole("TEACHER");
  const { termId } = await params;

  const term = await prisma.term.findUnique({
    where: { id: termId },
    include: { classes: { include: { subjects: true } }, academicYear: true },
  });

  if (!term) notFound();

  const addClassWithTerm = addClass.bind(null, termId);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <Link href={`/teacher/academic-years/${term.academicYearId}`} className="text-sm text-[#2B3A67]">
        ← Back to {term.academicYear.label}
      </Link>
      <h1 className="mt-2 text-xl font-semibold text-[#1C2321]">Classes</h1>

      <form action={addClassWithTerm} className="mt-6 flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="e.g. Grade 11 - STEM A"
          required
          className="flex-1 rounded border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded bg-[#1C2321] px-4 py-2 text-sm font-medium text-white hover:bg-[#2B3A67]"
        >
          Add Class
        </button>
      </form>

      <div className="mt-8 space-y-2">
        {term.classes.length === 0 && (
          <p className="text-sm text-[#1C2321]/40">No classes yet.</p>
        )}
        {term.classes.map((cls) => (
          <Link
            key={cls.id}
            href={`/teacher/classes/${cls.id}`}
            className="block rounded border p-4 text-sm hover:bg-[#FAFAF8]"
          >
            <span className="font-medium">{cls.name}</span>
            <span className="ml-2 text-[#1C2321]/40">
              {cls.subjects.length} subject{cls.subjects.length !== 1 ? "s" : ""}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}