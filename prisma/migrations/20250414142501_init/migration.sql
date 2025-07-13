-- CreateEnum
CREATE TYPE "TipoControlador" AS ENUM ('PESSOA_JURIDICA', 'PESSOA_NATURAL');

-- CreateEnum
CREATE TYPE "TipoParticipacaoSocietaria" AS ENUM ('SOCIO_ADMINISTRADOR', 'SOCIO_CAPITALISTA', 'ACIONISTA_OR', 'ACIONISTA_PR', 'OUTROS');

-- CreateTable
CREATE TABLE "Controlador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoControlador" NOT NULL DEFAULT 'PESSOA_JURIDICA',
    "cnpj" TEXT,
    "cpf" TEXT,
    "site" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "politicaPrivacidadeUrl" TEXT,
    "setorId" INTEGER,
    "cnaeId" INTEGER,
    "grupoEconomicoId" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "exclusionDate" TIMESTAMP(3),

    CONSTRAINT "Controlador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encarregado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "externo" BOOLEAN NOT NULL DEFAULT false,
    "empresaExternaId" INTEGER,
    "controladorId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "exclusionDate" TIMESTAMP(3),

    CONSTRAINT "Encarregado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmpresaDPO" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "site" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "exclusionDate" TIMESTAMP(3),

    CONSTRAINT "EmpresaDPO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Socio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "tipoParticipacao" "TipoParticipacaoSocietaria" NOT NULL,
    "nacionalidade" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "exclusionDate" TIMESTAMP(3),

    CONSTRAINT "Socio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocioControlador" (
    "id" SERIAL NOT NULL,
    "socioId" INTEGER NOT NULL,
    "controladorId" INTEGER NOT NULL,
    "percentual" DOUBLE PRECISION,

    CONSTRAINT "SocioControlador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoEconomico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "observacoes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "exclusionDate" TIMESTAMP(3),

    CONSTRAINT "GrupoEconomico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CNAE" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "exclusionDate" TIMESTAMP(3),

    CONSTRAINT "CNAE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "exclusionDate" TIMESTAMP(3),

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Controlador_cnpj_key" ON "Controlador"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Controlador_cpf_key" ON "Controlador"("cpf");

-- CreateIndex
CREATE INDEX "Controlador_active_idx" ON "Controlador"("active");

-- CreateIndex
CREATE UNIQUE INDEX "EmpresaDPO_cnpj_key" ON "EmpresaDPO"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Socio_cpfCnpj_key" ON "Socio"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "SocioControlador_socioId_controladorId_key" ON "SocioControlador"("socioId", "controladorId");

-- CreateIndex
CREATE UNIQUE INDEX "GrupoEconomico_nome_key" ON "GrupoEconomico"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "CNAE_code_key" ON "CNAE"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Setor_nome_key" ON "Setor"("nome");

-- AddForeignKey
ALTER TABLE "Controlador" ADD CONSTRAINT "Controlador_grupoEconomicoId_fkey" FOREIGN KEY ("grupoEconomicoId") REFERENCES "GrupoEconomico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Controlador" ADD CONSTRAINT "Controlador_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Controlador" ADD CONSTRAINT "Controlador_cnaeId_fkey" FOREIGN KEY ("cnaeId") REFERENCES "CNAE"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encarregado" ADD CONSTRAINT "Encarregado_empresaExternaId_fkey" FOREIGN KEY ("empresaExternaId") REFERENCES "EmpresaDPO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encarregado" ADD CONSTRAINT "Encarregado_controladorId_fkey" FOREIGN KEY ("controladorId") REFERENCES "Controlador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocioControlador" ADD CONSTRAINT "SocioControlador_socioId_fkey" FOREIGN KEY ("socioId") REFERENCES "Socio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocioControlador" ADD CONSTRAINT "SocioControlador_controladorId_fkey" FOREIGN KEY ("controladorId") REFERENCES "Controlador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
