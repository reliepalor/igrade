"use server";

import { requireRole } from "@/lib/auth/guards";
import { createClass } from "@/domain/services/academicStructure";
import { revalidatePath } from "next/cache";

export async function addClass(termId: string, formData: FormData) {
  await requireRole("TEACHER");
  const name = formData.get("name") as string;

  await createClass(termId, name);
  revalidatePath(`/teacher/terms/${termId}`);
}