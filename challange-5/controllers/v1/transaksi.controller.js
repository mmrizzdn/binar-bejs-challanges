// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Export function yang dibutuhin
module.exports = {
    kirimUang: async (req, res, next) => {
        try {
            // Dapetin data dari request body
            let { idRekAsal, idRekTujuan, jumlah } = req.body;
    
            // Dapetin informasi rekening asal dan tujuan dari database
            let rekAsal = await prisma.rekening.findUnique({
                where: { id: idRekAsal }
            });
            let rekTujuan = await prisma.rekening.findUnique({
                where: { id: idRekTujuan }
            });
    
            // Ngecek kevalidan rekening
            if (!rekAsal || !rekTujuan) {
                return res.status(404).json({
                    status: false,
                    message: 'rekening nggak ada!',
                    data: null
                });
            }
    
            // Ngecek kevalidan jumlah uang
            if (!jumlah || jumlah < 0) {
                return res.status(400).json({
                    status: false,
                    message: 'jumlah uang nggak valid!',
                    data: null
                });
            } else if (rekAsal.saldo < jumlah) {
                return res.status(400).json({
                    status: false,
                    message: 'saldo rekening asal kurang!',
                    data: null
                });
            }
    
            // // Update saldo rekening asal dan tujuan
            await prisma.rekening.update({
                where: { id: idRekAsal },
                data: { saldo: { decrement: jumlah } }
            });
            await prisma.rekening.update({
                where: { id: idRekTujuan },
                data: { saldo: { increment: jumlah } }
            });
    
            // Bikin catatan transaksi baru
            let transaksi = await prisma.transaksi.create({
                data: {
                    jumlah: jumlah,
                    idRekAsal,
                    idRekTujuan
                }
            });
    
            return res.status(201).json({
                status: true,
                message: 'transaksi berhasil!',
                data: transaksi
            });
        } catch (error) {
            next(error);
        }
    },

    daftarTransaksi: async (req, res, next) => {
        try {
            // Dapetin daftar transaksi dari database
            let transaksi = await prisma.transaksi.findMany();
    
            // Ngecek ada transaksi yang tersedia apa nggak
            if (transaksi.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'transaksi nggak ada!',
                    data: null
                });
            }
    
            return res.status(200).json({
                status: true,
                message: 'OKE',
                data: transaksi
            });
        } catch (error) {
            next(error);
        }
    },

    detailTransaksiById: async (req, res, next) => {
        try {
            // Dapetin ID transaksi dari parameter URL
            let id = Number(req.params.transactionId);
    
            // Nyari transaksi berdasarkan ID dengan dan nampilin pengirim dan penerimanya
            let transaksi = await prisma.transaksi.findUnique({
                where: { id },
                select: {
                    id: true,
                    jumlah: true,
                    dikirim: {
                        select: {
                            id: true,
                            namaBank: true,
                            noRek: true,
                            pengguna: { select: { nama: true } }
                        }
                    },
                    diterima: {
                        select: {
                            id: true,
                            namaBank: true,
                            noRek: true,
                            pengguna: { select: { nama: true } }
                        }
                    }
                }
            });
    
            // Ngecek transaksinya ketemu atau nggak
            if (!transaksi) {
                return res.status(404).json({
                    status: false,
                    message: 'id nggak ada!',
                    data: null
                });
            }
    
            return res.status(200).json({
                status: true,
                message: 'OKE',
                data: transaksi
            });
        } catch (error) {
            next(error);
        }
    },
};
