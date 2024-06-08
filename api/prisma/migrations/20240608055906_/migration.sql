/*
  Warnings:

  - A unique constraint covering the columns `[matchedId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "matchedId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Team_matchedId_key" ON "Team"("matchedId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_matchedId_fkey" FOREIGN KEY ("matchedId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
