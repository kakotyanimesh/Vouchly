/*
  Warnings:

  - You are about to drop the column `style` on the `EmbadedWall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmbadedWall" DROP COLUMN "style",
ADD COLUMN     "inlinestyle" TEXT,
ADD COLUMN     "shadowColor" TEXT,
ADD COLUMN     "starColor" TEXT;
