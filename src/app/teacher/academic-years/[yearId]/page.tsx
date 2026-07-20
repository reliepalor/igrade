import { requireRole } from "@/lib/auth/guards";
import { prisma } from "@/infrastructure/db/prisma";
import { addTerm } from "./actions";
import Link from "next/link";
import { notFound } from "next/navigation";

const TERM_LABELS: Record<string, string> = {
  FIRST: "1st Term",
  SECOND: "2nd Term",
  THIRD: "3rd Term",
};

export default async function AcademicYearPage({
  params,
}: {
  params: Promise<{ yearId: string }>;
}) {
  await requireRole("TEACHER");
  const { yearId } = await params;

  const year = await prisma.academicYear.findUnique({
    where: { id: yearId },
    include: { terms: { include: { classes: true } } },
  });

  if (!year) notFound();

  const existingTermNames = year.terms.map((t) => t.name);
  const availableTerms = (["FIRST", "SECOND", "THIRD"] as const).filter(
    (t) => !existingTermNames.includes(t)
  );

  const addTermWithYear = addTerm.bind(null, yearId);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <Link href="/teacher/dashboard" className="text-sm text-[#2B3A67]">
        ← Back to Academic Years
      </Link>
      <h1 className="mt-2 text-xl font-semibold text-[#1C2321]">{year.label}</h1>

      {availableTerms.length > 0 && (
        <form action={addTermWithYear} className="mt-6 flex gap-2">
          <select name="name" className="rounded border px-3 py-2 text-sm" required>
            {availableTerms.map((t) => (
              <option key={t} value={t}>
                {TERM_LABELS[t]}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded bg-[#1C2321] px-4 py-2 text-sm font-medium text-white hover:bg-[#2B3A67]"
          >
            Add Term
          </button>
        </form>
      )}

      <div className="mt-8 space-y-2">
        {year.terms.length === 0 && (
          <p className="text-sm text-[#1C2321]/40">No terms yet.</p>
        )}
        {year.terms.map((term) => (
          <Link
            key={term.id}
            href={`/teacher/terms/${term.id}`}
            className="block rounded border p-4 text-sm hover:bg-[#FAFAF8]"
          >
            <span className="font-medium">{TERM_LABELS[term.name]}</span>
            <span className="ml-2 text-[#1C2321]/40">
              {term.classes.length} class{term.classes.length !== 1 ? "es" : ""}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}