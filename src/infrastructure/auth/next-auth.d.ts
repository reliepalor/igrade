import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string | null;
      status: string;
      onboardingCompleted: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role: string | null;
    status: string;
    onboardingCompleted: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string | null;
    status: string;
    onboardingCompleted: boolean;
  }
}