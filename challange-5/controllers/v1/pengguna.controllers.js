// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Export function yang dibutuhin
module.exports = {
    daftarPengguna: async (req, res, next) => {
        try {
            // Dapetin daftar pengguna dari database
            let pengguna = await prisma.pengguna.findMany();

            // Ngecek ada pengguna yang terdaftar apa nggak
            if (pengguna.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'pengguna nggak ada!',
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'OKE',
                data: pengguna
            });
        } catch (error) {
            next(error);
        }
    },
    detailPengguna: async (req, res, next) => {
        try {
            // Dapetin ID pengguna dari parameter URL
            let id = Number(req.params.userId);

            // Nyari pengguna berdasarkan ID dengan masukin profilnya
            let pengguna = await prisma.pengguna.findUnique({
                where: { id },
                include: { Profil: true }
            });

            // Ngecek pengguna ada atau nggak
            if (!pengguna) {
                return res.status(404).json({
                    status: false,
                    message: `pengguna dengan id ${id} nggak ada!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'OKE',
                data: pengguna
            });
        } catch (error) {
            next(error);
        }
    }
};
