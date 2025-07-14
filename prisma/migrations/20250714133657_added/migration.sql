/*
  Warnings:

  - The values [Carousel,Classic,Masonry] on the enum `gridTypes` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `parentPageBgColor` on the `ReviewStyle` table. All the data in the column will be lost.
  - You are about to drop the column `rewiewCardBg` on the `ReviewStyle` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "gridTypes_new" AS ENUM ('ManualSlide', 'AutoSlide', 'FlipView', 'GlideUp', 'Luminate', 'BlueEcho', 'Default');
ALTER TABLE "ReviewStyle" ALTER COLUMN "gridType" DROP DEFAULT;
ALTER TABLE "ReviewStyle" ALTER COLUMN "gridType" TYPE "gridTypes_new" USING ("gridType"::text::"gridTypes_new");
ALTER TYPE "gridTypes" RENAME TO "gridTypes_old";
ALTER TYPE "gridTypes_new" RENAME TO "gridTypes";
DROP TYPE "gridTypes_old";
ALTER TABLE "ReviewStyle" ALTER COLUMN "gridType" SET DEFAULT 'ManualSlide';
COMMIT;

-- AlterTable
ALTER TABLE "ReviewStyle" DROP COLUMN "parentPageBgColor",
DROP COLUMN "rewiewCardBg",
ADD COLUMN     "parentBgColor" TEXT,
ADD COLUMN     "tesimoonialCardBg" TEXT,
ALTER COLUMN "gridType" SET DEFAULT 'ManualSlide';
