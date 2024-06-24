// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const express = require('express');
const apiV1 = require('./routes/v1/index.js');

const app = express();
const port = 3000;

// Make middleware express.json buat nge-handle body dengan format JSON
app.use(express.json());

// Make rute API versi 1 pada endpoint '/api/v1'
app.use('/api/v1', apiV1);

// Memulai server
app.listen(port, () => {
    console.log(`aplikasi berjalan di port ${port}`);
});
