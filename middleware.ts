import { auth } from "@/infrastructure/auth/auth.config";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { onboardingCompleted, status, role } = session.user;

  // Not onboarded yet -> force onboarding, unless already there
  if (!onboardingCompleted && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Teacher pending approval -> force pending page
  if (
    onboardingCompleted &&
    role === "TEACHER" &&
    status === "PENDING" &&
    pathname !== "/pending-approval"
  ) {
    return NextResponse.redirect(new URL("/pending-approval", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/teacher/:path*",
    "/student/:path*",
    "/onboarding",
    "/pending-approval",
  ],
};