"use server";

import { requireRole } from "@/lib/auth/guards";
import { createSubject } from "@/domain/services/academicStructure";
import { revalidatePath } from "next/cache";

export async function addSubject(classId: string, formData: FormData) {
  await requireRole("TEACHER");
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;

  await createSubject(classId, name, code);
  revalidatePath(`/teacher/classes/${classId}`);
}