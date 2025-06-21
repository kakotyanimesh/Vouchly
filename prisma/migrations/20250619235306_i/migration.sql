/*
  Warnings:

  - You are about to drop the column `scriptS3` on the `EmbadedWall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmbadedWall" DROP COLUMN "scriptS3";

-- AlterTable
ALTER TABLE "TestimonialForm" ADD COLUMN     "scriptS3" TEXT;
