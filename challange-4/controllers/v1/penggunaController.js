// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// Deklarasi dan inisialisasi jumlah salt rounds untuk bcrypt
const saltRounds = 10;

// Function nambah pengguna baru
const tambahPengguna = async (req, res, next) => {
    try {
        // Dapetin data pengguna serta profilnya dari request body
        let {
            nama,
            email,
            kataSandi,
            konfirmasiKataSandi,
            tipeIdentitas,
            noIdentitas,
            alamat
        } = req.body;

        // Ngecek kevalidan nama
        if (!nama) {
            return res.status(400).json({
                status: false,
                message: 'nama harus diisi!',
                data: null
            });
        }

        // Ngecek kevalidan email
        let emailTerpakai = await prisma.pengguna.findFirst({
            where: { email }
        });

        if (!email) {
            return res.status(400).json({
                status: false,
                message: 'email harus diisi!',
                data: null
            });
        } else if (emailTerpakai) {
            return res.status(400).json({
                status: false,
                message: 'email udah dipake!',
                data: null
            });
        }

        // Generate salt dan hash untuk kata sandi
        let salt = await bcrypt.genSalt(saltRounds);
        let hashed = await bcrypt.hash(kataSandi, salt);

        // Ngecek kevalidan kata sandi
        if (!kataSandi) {
            return res.status(400).json({
                status: false,
                message: 'kata sandi harus diisi!',
                data: null
            });
        } else if (konfirmasiKataSandi != kataSandi) {
            return res.status(400).json({
                status: false,
                message: 'kata sandi nggak cocok!',
                data: null
            });
        } else if (!tipeIdentitas) {
            return res.status(400).json({
                status: false,
                message: 'tipe identitas harus diisi!',
                data: null
            });
        }

        // Ngecek kevalidan nomer identitas
        let noIdentitasTerpakai = await prisma.profil.findFirst({
            where: { noIdentitas }
        });

        if (!noIdentitas) {
            return res.status(400).json({
                status: false,
                message: 'nomer identitas harus diisi!',
                data: null
            });
        } else if (noIdentitasTerpakai) {
            return res.status(400).json({
                status: false,
                message: 'nomer identitas udah dipake!',
                data: null
            });
        } else if (!alamat) {
            return res.status(400).json({
                status: false,
                message: 'alamat harus diisi!',
                data: null
            });
        }

        // Bikin pengguna baru dan profil
        let pengguna = await prisma.pengguna.create({
            data: {
                nama,
                email,
                kataSandi: hashed,
                Profil: { create: { tipeIdentitas, noIdentitas, alamat } }
            },
            include: { Profil: true }
        });

        return res.status(201).json({
            status: true,
            message: 'tambah pengguna berhasil!',
            data: pengguna
        });
    } catch (error) {
        next(error);
    }
};

// Function nampilin daftar pengguna
const daftarPengguna = async (req, res, next) => {
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
};

// Function nampilin detail pengguna berdasarkan ID
const detailPengguna = async (req, res, next) => {
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
};

// Export function yang dibutuhin
module.exports = {
    tambahPengguna,
    daftarPengguna,
    detailPengguna
};
