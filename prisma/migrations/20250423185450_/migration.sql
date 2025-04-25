-- DropForeignKey
ALTER TABLE "Imovel" DROP CONSTRAINT "Imovel_userId_fkey";

-- AddForeignKey
ALTER TABLE "Imovel" ADD CONSTRAINT "Imovel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
