import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@igrade.com" },
    update: { role: "ADMIN", status: "APPROVED", onboardingCompleted: true },
    create: {
      name: "Test Admin",
      email: "admin@igrade.com",
      password: hashedPassword,
      role: "ADMIN",
      status: "APPROVED",
      onboardingCompleted: true,
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: "teacher@igrade.com" },
    update: { role: "TEACHER", status: "APPROVED", onboardingCompleted: true },
    create: {
      name: "Test Teacher",
      email: "teacher@igrade.com",
      password: hashedPassword,
      role: "TEACHER",
      status: "APPROVED",
      onboardingCompleted: true,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: "student@igrade.com" },
    update: { role: "STUDENT", status: "APPROVED", onboardingCompleted: true, studentId: "2024-0001" },
    create: {
      name: "Test Student",
      email: "student@igrade.com",
      password: hashedPassword,
      role: "STUDENT",
      status: "APPROVED",
      onboardingCompleted: true,
      studentId: "2024-0001",
    },
  });

  console.log("Seeded:", { admin: admin.email, teacher: teacher.email, student: student.email });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());