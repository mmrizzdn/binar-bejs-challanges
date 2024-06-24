// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { JWT_SECRET } = process.env;

module.exports = {
    daftar: async (req, res, next) => {
        try {
            // Dapetin data pengguna serta profilnya dari request body
            let { nama, email, kataSandi, tipeIdentitas, noIdentitas, alamat } =
                req.body;

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

            // Ngecek kevalidan kata sandi
            if (!kataSandi) {
                return res.status(400).json({
                    status: false,
                    message: 'kata sandi harus diisi!',
                    data: null
                });
            } else if (!tipeIdentitas) {
                return res.status(400).json({
                    status: false,
                    message: 'tipe identitas harus diisi!',
                    data: null
                });
            }

            let hashed = await bcrypt.hash(kataSandi, 10);

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
    },

    masuk: async (req, res, next) => {
        try {
            // Dapetin data pengguna serta profilnya dari request body
            let { email, kataSandi } = req.body;

            if (!email || !kataSandi) {
                return res.status(400).json({
                    status: false,
                    message: 'email atau kata sandi dibutuhin!',
                    data: null
                });
            }

            // Ngecek kevalidan email
            let pengguna = await prisma.pengguna.findFirst({
                where: { email }
            });

            if (!pengguna) {
                return res.status(400).json({
                    status: false,
                    message: 'email atau kata sandi salah!',
                    data: null
                });
            }

            let passwordBenar = await bcrypt.compare(kataSandi, pengguna.kataSandi);

            if (!passwordBenar) {
                return res.status(400).json({
                    status: false,
                    message: 'email atau kata sandi salah!',
                    data: null
                });
            }

            delete pengguna.kataSandi;
            let token = jwt.sign(pengguna, JWT_SECRET);

            // login berhasil
            return res.status(201).json({
                status: true,
                message: 'login berhasil!',
                data: { ...pengguna, token }
            });
        } catch (error) {
            next(error);
        }
    },

    terautentikasi: async (req, res, next) => {
        try {
            res.json({
                status: true,
                message: 'autentikasi berhasil!',
                data: req.pengguna
            });
        } catch (error) {
            next(error);
        }
    }
};
