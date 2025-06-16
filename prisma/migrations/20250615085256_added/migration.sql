/*
  Warnings:

  - You are about to drop the column `textReview` on the `CustomerReview` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[textReviewId]` on the table `CustomerReview` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[viderId]` on the table `CustomerReview` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CustomerReview" DROP COLUMN "textReview",
ADD COLUMN     "textReviewId" INTEGER,
ADD COLUMN     "viderId" INTEGER;

-- CreateTable
CREATE TABLE "TextReview" (
    "id" SERIAL NOT NULL,
    "textReview" TEXT,

    CONSTRAINT "TextReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewVideoLink" (
    "id" SERIAL NOT NULL,
    "videoLink" TEXT,

    CONSTRAINT "ReviewVideoLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerReview_textReviewId_key" ON "CustomerReview"("textReviewId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerReview_viderId_key" ON "CustomerReview"("viderId");

-- AddForeignKey
ALTER TABLE "CustomerReview" ADD CONSTRAINT "CustomerReview_textReviewId_fkey" FOREIGN KEY ("textReviewId") REFERENCES "TextReview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerReview" ADD CONSTRAINT "CustomerReview_viderId_fkey" FOREIGN KEY ("viderId") REFERENCES "ReviewVideoLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;
