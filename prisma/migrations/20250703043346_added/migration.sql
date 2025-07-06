/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlanType" AS ENUM ('TRIAL', 'PRO', 'ENTERPRICE');

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_useremail_fkey";

-- DropTable
DROP TABLE "Subscription";

-- DropEnum
DROP TYPE "SubscriptionPlan";

-- CreateTable
CREATE TABLE "SubscriptionList" (
    "id" TEXT NOT NULL,
    "useremail" TEXT NOT NULL,
    "Active" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "subscriptionName" "SubscriptionPlanType" NOT NULL DEFAULT 'TRIAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "upadtedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionData" (
    "name" "SubscriptionPlanType" NOT NULL,
    "maxSpace" INTEGER NOT NULL,
    "maxTestimonialForm" INTEGER NOT NULL,
    "maxReview" INTEGER NOT NULL,
    "maxVideoReview" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionData_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionData_name_key" ON "SubscriptionData"("name");

-- AddForeignKey
ALTER TABLE "SubscriptionList" ADD CONSTRAINT "SubscriptionList_useremail_fkey" FOREIGN KEY ("useremail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionList" ADD CONSTRAINT "SubscriptionList_subscriptionName_fkey" FOREIGN KEY ("subscriptionName") REFERENCES "SubscriptionData"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
