-- CreateEnum
CREATE TYPE "gridTypes" AS ENUM ('Carousel', 'Classic', 'Masonry');

-- AlterTable
ALTER TABLE "ReviewStyle" ADD COLUMN     "gridType" "gridTypes" NOT NULL DEFAULT 'Masonry';
