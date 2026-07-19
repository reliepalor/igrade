"use server";

import { auth } from "@/infrastructure/auth/auth.config";
import {
  completeStudentOnboarding,
  completeTeacherOnboarding,
} from "@/domain/services/onboarding";
import { redirect } from "next/navigation";

export async function registerAsStudent(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const studentId = formData.get("studentId") as string;
  if (!studentId) return { error: "Student ID is required" };

  try {
    await completeStudentOnboarding(session.user.id, studentId);
  } catch (e) {
    return { error: (e as Error).message };
  }

  redirect("/dashboard");
}

export async function registerAsTeacher() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await completeTeacherOnboarding(session.user.id);

  redirect("/pending-approval");
}