/*
  Warnings:

  - You are about to drop the column `sizeInSquareMeters` on the `Imovel` table. All the data in the column will be lost.
  - Added the required column `area` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasParking` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Imovel" DROP COLUMN "sizeInSquareMeters",
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bedrooms" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hasParking" BOOLEAN NOT NULL;
