-- CreateTable
CREATE TABLE "gambar" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "url_gambar" TEXT NOT NULL,

    CONSTRAINT "gambar_pkey" PRIMARY KEY ("id")
);
