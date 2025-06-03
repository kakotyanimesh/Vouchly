-- DropIndex
DROP INDEX "TestimonialForm_spaceId_adminId_id_key";

-- CreateIndex
CREATE INDEX "TestimonialForm_spaceId_adminId_id_idx" ON "TestimonialForm"("spaceId", "adminId", "id");
