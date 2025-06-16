/*
  Warnings:

  - You are about to drop the column `textReviewId` on the `CustomerReview` table. All the data in the column will be lost.
  - You are about to drop the column `viderId` on the `CustomerReview` table. All the data in the column will be lost.
  - You are about to drop the `ReviewVideoLink` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customerReviewId]` on the table `TextReview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerReviewId` to the `TextReview` table without a default value. This is not possible if the table is not empty.
  - Made the column `textReview` on table `TextReview` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CustomerReview" DROP CONSTRAINT "CustomerReview_textReviewId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerReview" DROP CONSTRAINT "CustomerReview_viderId_fkey";

-- DropIndex
DROP INDEX "CustomerReview_textReviewId_key";

-- DropIndex
DROP INDEX "CustomerReview_viderId_key";

-- AlterTable
ALTER TABLE "CustomerReview" DROP COLUMN "textReviewId",
DROP COLUMN "viderId";

-- AlterTable
ALTER TABLE "TextReview" ADD COLUMN     "customerReviewId" INTEGER NOT NULL,
ALTER COLUMN "textReview" SET NOT NULL;

-- DropTable
DROP TABLE "ReviewVideoLink";

-- CreateTable
CREATE TABLE "VidoeReview" (
    "id" SERIAL NOT NULL,
    "customerReviewId" INTEGER NOT NULL,
    "videoLink" TEXT NOT NULL,

    CONSTRAINT "VidoeReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VidoeReview_customerReviewId_key" ON "VidoeReview"("customerReviewId");

-- CreateIndex
CREATE UNIQUE INDEX "TextReview_customerReviewId_key" ON "TextReview"("customerReviewId");

-- AddForeignKey
ALTER TABLE "TextReview" ADD CONSTRAINT "TextReview_customerReviewId_fkey" FOREIGN KEY ("customerReviewId") REFERENCES "CustomerReview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VidoeReview" ADD CONSTRAINT "VidoeReview_customerReviewId_fkey" FOREIGN KEY ("customerReviewId") REFERENCES "CustomerReview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
