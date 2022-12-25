-- CreateTable
CREATE TABLE "Senha" (
    "id" TEXT NOT NULL,
    "ambiente" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,

    CONSTRAINT "Senha_pkey" PRIMARY KEY ("id")
);
