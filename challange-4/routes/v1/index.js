// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const express = require('express');
const router = express.Router();

const penggunaController = require('../../controllers/v1/penggunaController.js');
const rekeningController = require('../../controllers/v1/rekeningController.js');
const transaksiController = require('../../controllers/v1/transaksiController.js');

// Pengguna/user
router.post('/user', penggunaController.tambahPengguna);
router.get('/users', penggunaController.daftarPengguna);
router.get('/users/:userId', penggunaController.detailPengguna);

// Rekening/account
router.post('/accounts', rekeningController.tambahRekening);
router.get('/accounts', rekeningController.daftarRekening);
router.get('/accounts/:accountId', rekeningController.detailRekeningById);
router.get('/accounts/bank/:bankName', rekeningController.detailRekeningByBank);

// Transaksi
router.post('/transactions', transaksiController.kirimUang);
router.get('/transactions', transaksiController.daftarTransaksi);
router.get('/transactions/:transactionId', transaksiController.detailTransaksiById);
router.get('/transactions/accountNumber/:accountNumber', transaksiController.detailTransaksiByNoRek);

module.exports = router;
