"use server";

import { approveTeacher, rejectTeacher } from "@/domain/services/teacherApproval";
import { revalidatePath } from "next/cache";

export async function approve(userId: string) {
  await approveTeacher(userId);
  revalidatePath("/admin/approvals");
}

export async function reject(userId: string) {
  await rejectTeacher(userId);
  revalidatePath("/admin/approvals");
}