import { requireRole } from "@/lib/auth/guards";
import { getTeacherAcademicYears } from "@/domain/services/academicStructure";
import { addAcademicYear } from "./actions";
import Link from "next/link";

export default async function TeacherDashboard() {
  const user = await requireRole("TEACHER");
  const years = await getTeacherAcademicYears(user.id);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-xl font-semibold text-[#1C2321]">Academic Years</h1>
      <p className="mt-1 text-sm text-[#1C2321]/50">
        Set up a year, then add terms, classes, and subjects under it.
      </p>

      <form action={addAcademicYear} className="mt-6 flex gap-2">
        <input
          type="text"
          name="label"
          placeholder="e.g. 2025-2026"
          required
          className="flex-1 rounded border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded bg-[#1C2321] px-4 py-2 text-sm font-medium text-white hover:bg-[#2B3A67]"
        >
          Add Year
        </button>
      </form>

      <div className="mt-8 space-y-2">
        {years.length === 0 && (
          <p className="text-sm text-[#1C2321]/40">No academic years yet.</p>
        )}
        {years.map((year) => (
          <Link
            key={year.id}
            href={`/teacher/academic-years/${year.id}`}
            className="block rounded border p-4 text-sm hover:bg-[#FAFAF8]"
          >
            <span className="font-medium">{year.label}</span>
            <span className="ml-2 text-[#1C2321]/40">
              {year.terms.length} term{year.terms.length !== 1 ? "s" : ""}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}