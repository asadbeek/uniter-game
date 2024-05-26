/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Token_token_key";

-- CreateIndex
CREATE UNIQUE INDEX "Token_id_key" ON "Token"("id");
