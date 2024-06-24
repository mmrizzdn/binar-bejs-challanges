// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

const imageKit = require('../../libs/imageKit');

module.exports = {
    unggah: async (req, res, next) => {
        try {
            let { judul, deskripsi } = req.body;

            if (!judul || !deskripsi || !req.file) {
                return res.status(400).json({
                    status: false,
                    message: 'data gaboleh ada yang kosong!',
                    data: null
                });
            }

            let strFile = req.file.buffer.toString('base64');

            let { url } = await imageKit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile,
                transformation: {
                    pre: 'w-320,h-240,q-80'
                }
            });

            let gambar = await prisma.gambar.create({
                data: {
                    judul,
                    deskripsi,
                    url_gambar: url
                }
            });

            return res.status(201).json({
                status: true,
                message: 'gambar berhasil diunggah!',
                data: gambar
            });
        } catch (error) {
            next(error);
        }
    },

    lihatSemua: async (req, res, next) => {
        try {
            let hasil = await prisma.gambar.findMany();

            if (hasil.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'ngga ada gambar yang diunggah',
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'OKE',
                data: hasil
            });
        } catch (error) {
            next(error);
        }
    },

    lihatDetail: async (req, res, next) => {
        try {
            let id = Number(req.params.id);

            let hasil = await prisma.gambar.findUnique({
                where: { id }
            });

            if (!hasil) {
                return res.status(404).json({
                    status: false,
                    message: `gambar dengan id ${id} ngga ada!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'OKE',
                data: hasil
            });
        } catch (error) {
            next(error);
        }
    },

    hapus: async (req, res, next) => {
        try {
            let id = Number(req.params.id);

            let hasil = await prisma.gambar.findUnique({
                where: { id }
            });

            if (!hasil) {
                return res.status(404).json({
                    status: false,
                    message: `gambar dengan id ${id} ngga ada!`,
                    data: null
                });
            }

            let gambar = await prisma.gambar.delete({
                where: { id }
            });

            return res.status(200).json({
                status: true,
                message: `gambar dengan id ${id} berhasil dihapus!`,
                data: gambar
            });
        } catch (error) {
            next(error);
        }
    },

    edit: async (req, res, next) => {
        try {
            let { judul, deskripsi } = req.body;
            let id = Number(req.params.id);

            let hasil = await prisma.gambar.findUnique({
                where: { id }
            });

            if (!hasil) {
                return res.status(404).json({
                    status: false,
                    message: `gambar dengan id ${id} ngga ada!`,
                    data: null
                });
            }

            let gambar = await prisma.gambar.update({
                where: { id },
                data: { judul, deskripsi }
            });

            return res.status(201).json({
                status: true,
                message: 'judul dan deskripsi gambar berhasil diedit!',
                data: gambar
            });
        } catch (error) {
            next(error);
        }
    }
};
