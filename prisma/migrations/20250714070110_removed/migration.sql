/*
  Warnings:

  - You are about to drop the `EmbadedWall` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmbadedWall" DROP CONSTRAINT "EmbadedWall_testimonialFormsId_fkey";

-- AlterTable
ALTER TABLE "ReviewStyle" ADD COLUMN     "selectedReviews" INTEGER[];

-- DropTable
DROP TABLE "EmbadedWall";
