/*
  Warnings:

  - You are about to drop the column `scriptS3` on the `TestimonialForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmbadedWall" ADD COLUMN     "scriptS3" TEXT,
ADD COLUMN     "style" TEXT;

-- AlterTable
ALTER TABLE "TestimonialForm" DROP COLUMN "scriptS3";
