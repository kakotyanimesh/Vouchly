-- DropForeignKey
ALTER TABLE "CustomerReview" DROP CONSTRAINT "CustomerReview_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerReview" DROP CONSTRAINT "CustomerReview_testimonialFormsId_fkey";

-- DropForeignKey
ALTER TABLE "TextReview" DROP CONSTRAINT "TextReview_customerReviewId_fkey";

-- DropForeignKey
ALTER TABLE "VidoeReview" DROP CONSTRAINT "VidoeReview_customerReviewId_fkey";

-- AddForeignKey
ALTER TABLE "CustomerReview" ADD CONSTRAINT "CustomerReview_testimonialFormsId_fkey" FOREIGN KEY ("testimonialFormsId") REFERENCES "TestimonialForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerReview" ADD CONSTRAINT "CustomerReview_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Spaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextReview" ADD CONSTRAINT "TextReview_customerReviewId_fkey" FOREIGN KEY ("customerReviewId") REFERENCES "CustomerReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VidoeReview" ADD CONSTRAINT "VidoeReview_customerReviewId_fkey" FOREIGN KEY ("customerReviewId") REFERENCES "CustomerReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
