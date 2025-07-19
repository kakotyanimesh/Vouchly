-- DropForeignKey
ALTER TABLE "ReviewStyle" DROP CONSTRAINT "ReviewStyle_testimonialFormId_fkey";

-- AddForeignKey
ALTER TABLE "ReviewStyle" ADD CONSTRAINT "ReviewStyle_testimonialFormId_fkey" FOREIGN KEY ("testimonialFormId") REFERENCES "TestimonialForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
