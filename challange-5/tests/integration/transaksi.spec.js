// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const app = require('../../app');
const request = require('supertest');

let transaksi = [];

describe('test tambahPengguna()', () => {
    let idRekAsal = 1;
    let idRekTujuan = 1;
    let jumlah = 200000;

    let idRekAsal2 = 1;
    let idRekTujuan2 = 1;
    let jumlah2 = 200000000;

    test('test POST /api/v1/transactions endpoint -> berhasil', async () => {
        try {
            let { statusCode, body } = await request(app)
                .post('/api/v1/transactions')
                .send({
                    idRekAsal,
                    idRekTujuan,
                    jumlah
                });

            transaksi.push(body.data);

            expect(statusCode).toBe(201);

            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('idRekAsal');
            expect(body.data).toHaveProperty('idRekTujuan');
            expect(body.data).toHaveProperty('jumlah');

            expect(body.data.idRekAsal).toBe(idRekAsal);
            expect(body.data.idRekTujuan).toBe(idRekTujuan);
            expect(body.data.jumlah).toBe(jumlah);
        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('test jumlah saldo kurang -> error', async () => {
        try {
            let { statusCode } = await request(app)
                .post('/api/v1/transactions')
                .send({
                    idRekAsal2,
                    idRekTujuan2,
                    jumlah2
                });

            expect(statusCode).toBe(400);
        } catch (error) {
            expect(error).toBe('saldo rekening asal kurang!');
        }
    });
});

describe('test daftarTransaksi()', () => {
    test('test  GET /api/v1/transactions endpoint -> berhasil', async () => {
        try {
            let { body, statusCode } = await request(app).get(
                '/api/v1/transactions'
            );

            expect(statusCode).toBe(200);

            transaksi.forEach((listTransaksi, i) => {
                expect(body.data[i]).toHaveProperty('id');
                expect(body.data[i]).toHaveProperty('rekAsal');
                expect(body.data[i]).toHaveProperty('rekTujuan');
                expect(body.data[i]).toHaveProperty('jumlah');

                expect(body.data[i].id).toBe(listTransaksi.id);
                expect(body.data[i].rekAsal).toBe(listTransaksi.rekAsal);
                expect(body.data[i].rekTujuan).toBe(listTransaksi.rekTujuan);
                expect(body.data[i].jumlah).toBe(listTransaksi.jumlah);
            });
        } catch (error) {
            expect(error).toBe('error');
        }
    });
});

describe('test detailTransaksiById(:id)', () => {
    test('test GET /api/v1/transactions/:transactionId endpoint -> berhasil', async () => {
        try {
            let { body, statusCode } = await request(app).get(
                '/api/v1/transactions/1'
            );

            expect(statusCode).toBe(200);

            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('rekAsal');
            expect(body.data).toHaveProperty('rekTujuan');
            expect(body.data).toHaveProperty('jumlah');

            expect(body.data.id).toBe(transaksi[0].id);
            expect(body.data.rekAsal).toBe(transaksi[0].rekAsal);
            expect(body.data.rekTujuan).toBe(transaksi[0].rekTujuan);
            expect(body.data.jumlah).toBe(transaksi[0].jumlah);
        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('test dapetin transaksi dengan id yang invalid -> error', async () => {
        try {
            let id = -1;
            let { body } = await request(app).get(`/api/v1/transactions/${id}`);
        } catch (error) {
            expect(error).toBe('id nggak ada!');
        }
    });
});
