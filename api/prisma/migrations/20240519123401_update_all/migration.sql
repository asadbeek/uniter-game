/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Made the column `image` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");
