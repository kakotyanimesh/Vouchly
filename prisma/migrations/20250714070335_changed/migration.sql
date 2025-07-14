/*
  Warnings:

  - The primary key for the `ReviewStyle` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ReviewStyle" DROP CONSTRAINT "ReviewStyle_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ReviewStyle_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ReviewStyle_id_seq";
