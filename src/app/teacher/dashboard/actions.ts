"use server";

import { requireRole } from "@/lib/auth/guards";
import { createAcademicYear } from "@/domain/services/academicStructure";
import { revalidatePath } from "next/cache";

export async function addAcademicYear(formData: FormData) {
  const user = await requireRole("TEACHER");
  const label = formData.get("label") as string;

  await createAcademicYear(user.id, label);
  revalidatePath("/teacher/dashboard");
}