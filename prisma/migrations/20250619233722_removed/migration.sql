/*
  Warnings:

  - You are about to drop the column `s3KeyId` on the `EmbadedWall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmbadedWall" DROP COLUMN "s3KeyId";

-- AlterTable
ALTER TABLE "TestimonialForm" ADD COLUMN     "scriptS3" TEXT;
