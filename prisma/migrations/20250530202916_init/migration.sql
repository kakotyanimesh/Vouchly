-- CreateEnum
CREATE TYPE "status" AS ENUM ('Active', 'Archived', 'Draft');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spaces" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "spaceName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialForm" (
    "id" SERIAL NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "questions" TEXT[],
    "brandLogo" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "status" NOT NULL DEFAULT 'Draft',

    CONSTRAINT "TestimonialForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerReview" (
    "id" SERIAL NOT NULL,
    "testimonialFormsId" INTEGER NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "textReview" TEXT,
    "customerImageUrl" TEXT NOT NULL,
    "customerVideoUrl" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "customerCompany" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Spaces_userId_id_key" ON "Spaces"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "TestimonialForm_spaceId_adminId_id_key" ON "TestimonialForm"("spaceId", "adminId", "id");

-- AddForeignKey
ALTER TABLE "Spaces" ADD CONSTRAINT "Spaces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialForm" ADD CONSTRAINT "TestimonialForm_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialForm" ADD CONSTRAINT "TestimonialForm_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerReview" ADD CONSTRAINT "CustomerReview_testimonialFormsId_fkey" FOREIGN KEY ("testimonialFormsId") REFERENCES "TestimonialForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerReview" ADD CONSTRAINT "CustomerReview_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerReview" ADD CONSTRAINT "CustomerReview_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
