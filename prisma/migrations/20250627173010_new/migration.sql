/*
  Warnings:

  - You are about to drop the column `inlinestyle` on the `ReviewStyle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReviewStyle" DROP COLUMN "inlinestyle",
ADD COLUMN     "rewiewCardBg" TEXT,
ADD COLUMN     "roundedCorner" TEXT,
ADD COLUMN     "textColor" TEXT;
