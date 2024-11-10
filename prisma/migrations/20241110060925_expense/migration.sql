/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "budget" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Expense_id_key" ON "Expense"("id");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
