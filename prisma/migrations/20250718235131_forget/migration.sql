-- DropForeignKey
ALTER TABLE "TestimonialForm" DROP CONSTRAINT "TestimonialForm_spaceId_fkey";

-- AddForeignKey
ALTER TABLE "TestimonialForm" ADD CONSTRAINT "TestimonialForm_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Spaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
