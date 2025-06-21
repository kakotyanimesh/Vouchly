/*
  Warnings:

  - Made the column `s3KeyId` on table `EmbadedWall` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EmbadedWall" ALTER COLUMN "s3KeyId" SET NOT NULL;
