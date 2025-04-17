/*
  Warnings:

  - You are about to drop the column `code` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `StudySession` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `StudySession` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_CourseToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SessionAttendees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CourseToUser" DROP CONSTRAINT "_CourseToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToUser" DROP CONSTRAINT "_CourseToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_SessionAttendees" DROP CONSTRAINT "_SessionAttendees_A_fkey";

-- DropForeignKey
ALTER TABLE "_SessionAttendees" DROP CONSTRAINT "_SessionAttendees_B_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "StudySession" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "_CourseToUser";

-- DropTable
DROP TABLE "_SessionAttendees";

-- DropEnum
DROP TYPE "Condition";

-- CreateTable
CREATE TABLE "_UserCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AttendeeSessions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserCourses_AB_unique" ON "_UserCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCourses_B_index" ON "_UserCourses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendeeSessions_AB_unique" ON "_AttendeeSessions"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendeeSessions_B_index" ON "_AttendeeSessions"("B");

-- AddForeignKey
ALTER TABLE "_UserCourses" ADD CONSTRAINT "_UserCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCourses" ADD CONSTRAINT "_UserCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeeSessions" ADD CONSTRAINT "_AttendeeSessions_A_fkey" FOREIGN KEY ("A") REFERENCES "StudySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeeSessions" ADD CONSTRAINT "_AttendeeSessions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
