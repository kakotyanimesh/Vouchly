/*
  Warnings:

  - You are about to drop the column `inlinestyle` on the `EmbadedWall` table. All the data in the column will be lost.
  - You are about to drop the column `shadowColor` on the `EmbadedWall` table. All the data in the column will be lost.
  - You are about to drop the column `starColor` on the `EmbadedWall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmbadedWall" DROP COLUMN "inlinestyle",
DROP COLUMN "shadowColor",
DROP COLUMN "starColor";

-- CreateTable
CREATE TABLE "ReviewStyle" (
    "id" SERIAL NOT NULL,
    "inlinestyle" TEXT,
    "shadowColor" TEXT,
    "starColor" TEXT,
    "testimonialFormId" INTEGER NOT NULL,

    CONSTRAINT "ReviewStyle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewStyle_testimonialFormId_key" ON "ReviewStyle"("testimonialFormId");

-- AddForeignKey
ALTER TABLE "ReviewStyle" ADD CONSTRAINT "ReviewStyle_testimonialFormId_fkey" FOREIGN KEY ("testimonialFormId") REFERENCES "TestimonialForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
