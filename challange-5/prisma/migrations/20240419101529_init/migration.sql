-- CreateTable
CREATE TABLE "pengguna" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "kataSandi" TEXT NOT NULL,

    CONSTRAINT "pengguna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rekening" (
    "id" SERIAL NOT NULL,
    "namaBank" TEXT NOT NULL,
    "noRek" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "idPengguna" INTEGER NOT NULL,

    CONSTRAINT "rekening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id" SERIAL NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "idRekAsal" INTEGER,
    "idRekTujuan" INTEGER,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profil" (
    "id" SERIAL NOT NULL,
    "tipeIdentitas" TEXT NOT NULL,
    "noIdentitas" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "idPengguna" INTEGER NOT NULL,

    CONSTRAINT "profil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_email_key" ON "pengguna"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rekening_noRek_key" ON "rekening"("noRek");

-- CreateIndex
CREATE UNIQUE INDEX "profil_noIdentitas_key" ON "profil"("noIdentitas");

-- CreateIndex
CREATE UNIQUE INDEX "profil_idPengguna_key" ON "profil"("idPengguna");

-- AddForeignKey
ALTER TABLE "rekening" ADD CONSTRAINT "rekening_idPengguna_fkey" FOREIGN KEY ("idPengguna") REFERENCES "pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_idRekAsal_fkey" FOREIGN KEY ("idRekAsal") REFERENCES "rekening"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_idRekTujuan_fkey" FOREIGN KEY ("idRekTujuan") REFERENCES "rekening"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profil" ADD CONSTRAINT "profil_idPengguna_fkey" FOREIGN KEY ("idPengguna") REFERENCES "pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
