/*
  Warnings:

  - Added the required column `jobTitle` to the `CustomerReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerReview" ADD COLUMN     "jobTitle" TEXT NOT NULL;
