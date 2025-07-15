/*
  Warnings:

  - A unique constraint covering the columns `[id,adminId]` on the table `TestimonialForm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestimonialForm_id_adminId_key" ON "TestimonialForm"("id", "adminId");
