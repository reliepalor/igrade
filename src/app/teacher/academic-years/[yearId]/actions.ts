"use server";

import { requireRole } from "@/lib/auth/guards";
import { createTerm } from "@/domain/services/academicStructure";
import { TermName } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

export async function addTerm(yearId: string, formData: FormData) {
  await requireRole("TEACHER");
  const name = formData.get("name") as TermName;

  await createTerm(yearId, name);
  revalidatePath(`/teacher/academic-years/${yearId}`);
}