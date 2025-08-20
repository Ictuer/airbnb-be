/*
  Warnings:

  - You are about to drop the column `avgScore` on the `knowledges` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `knowledges` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `topicId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `topics` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `topics` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `topics` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `clerkUserId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[scheduleKnowledgeId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `knowledges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Made the column `knowledgeId` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `topics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `streak` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "TypeQuestion" AS ENUM ('theory', 'practice');

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_roleId_fkey";

-- DropForeignKey
ALTER TABLE "knowledges" DROP CONSTRAINT "knowledges_topicId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_knowledgeId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_topicId_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_userId_fkey";

-- DropIndex
DROP INDEX "users_clerkUserId_key";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "activities" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "knowledges" DROP COLUMN "avgScore",
DROP COLUMN "content",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active',
ADD COLUMN     "theory" TEXT;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "messageId",
DROP COLUMN "topicId",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "explain" TEXT,
ADD COLUMN     "type" "TypeQuestion" NOT NULL,
ALTER COLUMN "knowledgeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "prompt" SET DEFAULT 'Không có mô tả';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarUrl",
DROP COLUMN "clerkUserId",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "intervalSendMessage" INTEGER,
ADD COLUMN     "longestStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scheduleKnowledgeId" TEXT,
ADD COLUMN     "scheduleTypeQuestion" "TypeQuestion",
ALTER COLUMN "streak" SET NOT NULL;

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "permissions";

-- DropTable
DROP TABLE "role_permissions";

-- DropTable
DROP TABLE "roles";

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_scheduleKnowledgeId_key" ON "users"("scheduleKnowledgeId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_scheduleKnowledgeId_fkey" FOREIGN KEY ("scheduleKnowledgeId") REFERENCES "knowledges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledges" ADD CONSTRAINT "knowledges_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "knowledges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledges" ADD CONSTRAINT "knowledges_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_knowledgeId_fkey" FOREIGN KEY ("knowledgeId") REFERENCES "knowledges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
