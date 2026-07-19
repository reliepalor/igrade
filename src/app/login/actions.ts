"use server";

import { signIn } from "@/infrastructure/auth/auth.config";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function loginWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=invalid");
    }
    throw error; // NextAuth's own redirect throws internally on success — must re-throw
  }
}