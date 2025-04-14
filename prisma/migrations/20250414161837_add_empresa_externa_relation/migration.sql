/*
  Warnings:

  - You are about to drop the column `empresaExternaId` on the `Encarregado` table. All the data in the column will be lost.
  - You are about to drop the `EmpresaDPO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Encarregado" DROP CONSTRAINT "Encarregado_empresaExternaId_fkey";

-- AlterTable
ALTER TABLE "Encarregado" DROP COLUMN "empresaExternaId",
ADD COLUMN     "controladorEmpresaExternaId" INTEGER;

-- DropTable
DROP TABLE "EmpresaDPO";

-- AddForeignKey
ALTER TABLE "Encarregado" ADD CONSTRAINT "Encarregado_controladorEmpresaExternaId_fkey" FOREIGN KEY ("controladorEmpresaExternaId") REFERENCES "Controlador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
