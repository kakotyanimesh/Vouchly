-- CreateTable
CREATE TABLE "EmbadedWall" (
    "id" TEXT NOT NULL,
    "testimonialFormsId" INTEGER NOT NULL,
    "selectedReviews" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmbadedWall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmbadedWall_testimonialFormsId_key" ON "EmbadedWall"("testimonialFormsId");

-- AddForeignKey
ALTER TABLE "EmbadedWall" ADD CONSTRAINT "EmbadedWall_testimonialFormsId_fkey" FOREIGN KEY ("testimonialFormsId") REFERENCES "TestimonialForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
