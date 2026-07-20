/*
  Warnings:

  - You are about to drop the column `createdAt` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `gradingPeriod` on the `grades` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `subjects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,subjectId]` on the table `grades` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[classId,code]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classId` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TermName" AS ENUM ('FIRST', 'SECOND', 'THIRD');

-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_teacherId_fkey";

-- DropIndex
DROP INDEX "grades_studentId_subjectId_gradingPeriod_key";

-- DropIndex
DROP INDEX "subjects_code_key";

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "createdAt",
ADD COLUMN     "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "grades" DROP COLUMN "gradingPeriod";

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "teacherId",
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "classId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "academic_years" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "academic_years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "terms" (
    "id" TEXT NOT NULL,
    "name" "TermName" NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade_history" (
    "id" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "oldValue" DOUBLE PRECISION,
    "newValue" DOUBLE PRECISION NOT NULL,
    "changedById" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grade_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "academic_years_teacherId_label_key" ON "academic_years"("teacherId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "terms_academicYearId_name_key" ON "terms"("academicYearId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "grades_studentId_subjectId_key" ON "grades"("studentId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_classId_code_key" ON "subjects"("classId", "code");

-- AddForeignKey
ALTER TABLE "academic_years" ADD CONSTRAINT "academic_years_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academic_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_history" ADD CONSTRAINT "grade_history_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_history" ADD CONSTRAINT "grade_history_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
