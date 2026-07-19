import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/infrastructure/db/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          onboardingCompleted: user.onboardingCompleted,
        };
      },
    }),
  ],
    callbacks: {
    async jwt({ token, user, trigger }) {
        if (user) {
        token.role = user.role;
        token.id = user.id;
        token.status = user.status;
        token.onboardingCompleted = user.onboardingCompleted;
        }

        // Re-fetch fresh data on every request so role/status changes
        // (e.g. admin approves a teacher) reflect without re-login
        if (trigger === "update" || !user) {
        const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
        });
        if (dbUser) {
            token.role = dbUser.role;
            token.status = dbUser.status;
            token.onboardingCompleted = dbUser.onboardingCompleted;
        }
        }

        return token;
    },
    async session({ session, token }) {
        if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.status = token.status as string;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
        }
        return session;
    },
    },
  pages: {
    signIn: "/login", // custom login page, we'll build this next
  },
});