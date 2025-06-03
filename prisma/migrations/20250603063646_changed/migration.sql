-- DropIndex
DROP INDEX "TestimonialForm_spaceId_adminId_id_idx";

-- CreateIndex
CREATE INDEX "TestimonialForm_spaceId_adminId_idx" ON "TestimonialForm"("spaceId", "adminId");
