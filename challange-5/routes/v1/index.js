// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

var express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();

require('dotenv').config();

const { JWT_SECRET } = process.env;

const {
    daftarPengguna,
    detailPengguna
} = require('../../controllers/v1/pengguna.controllers.js');
const {
    tambahRekening,
    daftarRekening,
    detailRekeningById
} = require('../../controllers/v1/rekening.controller.js');
const {
    kirimUang,
    daftarTransaksi,
    detailTransaksiById
} = require('../../controllers/v1/transaksi.controller.js');
const {
    daftar,
    masuk,
    terautentikasi
} = require('../../controllers/v1/autentikasi.controllers.js');

let restrict = (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization || !authorization.split(' ')[1]) {
        return res.status(401).json({
            status: false,
            message: 'token nggak tersedia!!',
            data: null
        });
    }

    let token = authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (error, pengguna) => {
        if (error) {
            return res.status(401).json({
                status: false,
                message: error.message,
                data: null
            });
        }
        delete pengguna.iat;
        req.pengguna = pengguna;
        next();
    });
};

// Autentikasi
router.post('/users/auth/register', daftar);
router.post('/users/auth/login', masuk);
router.get('/users/auth/authenticate', restrict, terautentikasi);

// Pengguna/user
router.get('/users', daftarPengguna);
router.get('/users/:userId', detailPengguna);

// Rekening/account
router.post('/accounts', tambahRekening);
router.get('/accounts', daftarRekening);
router.get('/accounts/:accountId', detailRekeningById);

// Transaksi
router.post('/transactions', kirimUang);
router.get('/transactions', daftarTransaksi);
router.get('/transactions/:transactionId', detailTransaksiById);

module.exports = router;
