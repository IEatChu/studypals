-- AlterTable
ALTER TABLE "_AttendeeSessions" ADD CONSTRAINT "_AttendeeSessions_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AttendeeSessions_AB_unique";

-- AlterTable
ALTER TABLE "_UserCourses" ADD CONSTRAINT "_UserCourses_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserCourses_AB_unique";
