/*
  Warnings:

  - You are about to drop the column `games` on the `Team` table. All the data in the column will be lost.
  - Added the required column `category` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "games",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "img" TEXT NOT NULL;
