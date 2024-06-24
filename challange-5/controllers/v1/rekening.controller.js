// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Export function yang dibutuhin
module.exports = {
    tambahRekening: async (req, res, next) => {
        try {
            // Dapetin data rekening dari request body
            let { namaBank, noRek, saldo } = req.body;
    
            // Ngecek kevalidan namaBank
            if (!namaBank) {
                return res.status(400).json({
                    status: false,
                    message: 'nama bank harus diisi!',
                    data: null
                });
            }
    
            // Ngecek kevalidan nomor rekening
            let noRekTerpakai = await prisma.rekening.findFirst({
                where: { noRek }
            });
            if (!noRek) {
                return res.status(400).json({
                    status: false,
                    message: 'nomer rekening harus diisi!',
                    data: null
                });
            } else if (noRekTerpakai) {
                return res.status(400).json({
                    status: false,
                    message: 'nomer rekening udah dipake!',
                    data: null
                });
            }
    
            // Ngecek kevalidan saldo dan memenuhi minimal
            const minSaldo = 500000;
            if (!saldo) {
                return res.status(400).json({
                    status: false,
                    message: 'saldo harus diisi!',
                    data: null
                });
            } else if (saldo < minSaldo) {
                return res.status(400).json({
                    status: false,
                    message: 'saldo harus memenuhi minimal!',
                    data: null
                });
            }
    
            // Ngecek keberadaan idPengguna
            id = Number(req.body.idPengguna);
            let idPengguna = await prisma.pengguna.findUnique({
                where: { id }
            });
    
            if (!id) {
                return res.status(400).json({
                    status: false,
                    message: 'id pengguna harus diisi!',
                    data: null
                });
            } else if (!idPengguna) {
                return res.status(400).json({
                    status: false,
                    message: 'pengguna belum terdaftar!',
                    data: null
                });
            }
    
            let rekening = await prisma.rekening.create({
                data: {
                    namaBank,
                    noRek,
                    saldo,
                    idPengguna: id
                }
            });
    
            return res.status(201).json({
                status: true,
                message: 'tambah rekening/akun berhasil!',
                data: rekening
            });
        } catch (error) {
            next(error);
        }
    },

    daftarRekening: async (req, res, next) => {
        try {
            // Dapetin daftar rekening dari database dengan nama pengguna terkait
            let rekening = await prisma.rekening.findMany({
                include: { pengguna: { select: { nama: true } } }
            });
    
            // Ngecek ada rekening yang tersedia apa nggak
            if (rekening.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'rekening nggak ada!',
                    data: null
                });
            }
    
            return res.status(200).json({
                status: true,
                message: 'OKE',
                data: rekening
            });
        } catch (error) {
            next(error);
        }
    },
    
    detailRekeningById: async (req, res, next) => {
        try {
            // Dapetin ID rekening dari parameter URL
            let id = Number(req.params.accountId);
    
            // Nyari rekening berdasarkan ID dengan nama pengguna terkait
            let rekening = await prisma.rekening.findUnique({
                where: { id },
                include: { pengguna: { select: { nama: true } } }
            });
    
            // Ngecek apakah rekening ditemukan
            if (!rekening) {
                return res.status(404).json({
                    status: false,
                    message: `rekening dengan id ${id} nggak ada!`,
                    data: null
                });
            }
    
            return res.status(200).json({
                status: true,
                message: 'OKE',
                data: rekening
            });
        } catch (error) {
            next(error);
        }
    },
};
