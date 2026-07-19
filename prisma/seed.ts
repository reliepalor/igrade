import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@igrade.com" },
    update: {},
    create: {
    name: "Test Admin",
    email: "admin@igrade.com",
    password: hashedPassword,
    role: "ADMIN",
    status: "APPROVED",
    onboardingCompleted: true,
    },
  });

  console.log("Seeded test admin user");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());