/*
  Warnings:

  - Added the required column `parentPageBgColor` to the `ReviewStyle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewStyle" ADD COLUMN     "parentPageBgColor" TEXT NOT NULL;
