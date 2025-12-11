-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('video', 'tweet', 'link');

-- AlterTable
ALTER TABLE "memory" ADD COLUMN     "type" "ContentType";
