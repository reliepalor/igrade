import { auth } from "@/infrastructure/auth/auth.config";
import { redirect } from "next/navigation";

export async function requireRole(allowedRole: "ADMIN" | "TEACHER" | "STUDENT") {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== allowedRole) {
    redirect("/dashboard"); // fallback: bounce to generic dashboard
  }

  return session.user;
}