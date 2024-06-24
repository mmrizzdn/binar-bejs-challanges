// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

var express = require('express');
var router = express.Router();

const {
    unggah,
    lihatSemua,
    lihatDetail,
    hapus,
    edit
} = require('../../controllers/v1/media.controllers');

const { gambar } = require('../../libs/multer');

router.post('/images', gambar.single('file'), unggah);
router.get('/images', lihatSemua);
router.get('/images/:id', lihatDetail);
router.delete('/images/:id', hapus);
router.put('/images/:id', edit);

module.exports = router;
