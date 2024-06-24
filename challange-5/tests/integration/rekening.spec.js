// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const app = require('../../app');
const request = require('supertest');

let rekening = [];

describe('test tambahPengguna()', () => {
    let namaBank = 'bni';
    let noRek = '1234567890';
    let saldo = 500000;
    let idPengguna = 1;

    let namaBank2 = 'bri';
    let noRek2 = '1234567890';
    let saldo2 = 300000;
    let idPengguna2 = 1;

    let namaBank3 = 'bri';
    let noRek3 = '1234567892';
    let saldo3 = 700000;
    let idPengguna3 = 2;

    let namaBank4 = 'bri';
    let noRek4 = '1234567893';
    let saldo4 = 700000;
    let idPengguna4 = 1;

    test('test POST /api/v1/accounts endpoint -> berhasil', async () => {
        try {
            let { statusCode, body } = await request(app)
                .post('/api/v1/accounts')
                .send({
                    namaBank,
                    noRek,
                    saldo,
                    idPengguna
                });

            rekening.push(body.data);

            expect(statusCode).toBe(201);

            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('namaBank');
            expect(body.data).toHaveProperty('noRek');
            expect(body.data).toHaveProperty('saldo');
            expect(body.data).toHaveProperty('idPengguna');

            expect(body.data.namaBank).toBe(namaBank);
            expect(body.data.noRek).toBe(noRek);
            expect(body.data.saldo).toBe(saldo);
            expect(body.data.idPengguna).toBe(idPengguna);
            
        } catch (error) {
            expect(error).toBe('error');
        }
    });

    // test('test POST /api/v1/accounts endpoint -> berhasil', async () => {
    //     try {
    //         let { statusCode, body } = await request(app)
    //             .post('/api/v1/accounts')
    //             .send({
    //                 namaBank4,
    //                 noRek4,
    //                 saldo4,
    //                 idPengguna4
    //             });

    //         rekening.push(body.data);

    //         expect(statusCode).toBe(201);

    //         expect(body).toHaveProperty('status');
    //         expect(body).toHaveProperty('message');
    //         expect(body).toHaveProperty('data');
    //         expect(body.data).toHaveProperty('id');
    //         expect(body.data).toHaveProperty('namaBank');
    //         expect(body.data).toHaveProperty('noRek');
    //         expect(body.data).toHaveProperty('saldo');
    //         expect(body.data).toHaveProperty('idPengguna');

    //         expect(body.data.namaBank).toBe(namaBank4);
    //         expect(body.data.noRek).toBe(noRek4);
    //         expect(body.data.saldo).toBe(saldo4);
    //         expect(body.data.idPengguna).toBe(idPengguna4);
            
    //     } catch (error) {
    //         expect(error).toBe('error');
    //     }
    // });

    test('test nomer rekening udah dipake -> error', async () => {
        try {
            let { statusCode } = await request(app)
                .post('/api/v1/accounts')
                .send({
                    namaBank2,
                    noRek2,
                    saldo2,
                    idPengguna2
                });

            expect(statusCode).toBe(400);
        } catch (error) {
            expect(error).toBe('saldo harus memenuhi minimal!');
        }
    });

    test('test pengguna belum terdaftar -> error', async () => {
        try {
            let { statusCode } = await request(app)
            .post('/api/v1/accounts')
            .send({
                namaBank3,
                noRek3,
                saldo3,
                idPengguna3
            });

            expect(statusCode).toBe(400);
        } catch (error) {
            expect(error).toBe('pengguna belum terdaftar!');
        }
    });
});

describe('test daftarRekening()', () => {
    test('test  GET /api/v1/accounts endpoint -> berhasil', async () => {
        try {
            let { body, statusCode } = await request(app).get('/api/v1/accounts');

            expect(statusCode).toBe(200);

            rekening.forEach((listRekening, i) => {
                expect(body.data[i]).toHaveProperty('id');
                expect(body.data[i]).toHaveProperty('namaBank');
                expect(body.data[i]).toHaveProperty('noRek');
                expect(body.data[i]).toHaveProperty('saldo');
                expect(body.data[i]).toHaveProperty('idPengguna');
                expect(body.data[i]).toHaveProperty('pengguna');

                expect(body.data[i].id).toBe(listRekening.id);
                expect(body.data[i].namaBank).toBe(listRekening.namaBank);
                expect(body.data[i].noRek).toBe(listRekening.noRek);
                expect(body.data[i].saldo).toBe(listRekening.saldo);
                expect(body.data[i].idPengguna).toBe(listRekening.idPengguna);
            });
        } catch (error) {
            expect(error).toBe('error');
        }
    });
});

describe('test detailRekeningById(:id)', () => {
    test('test GET /api/v1/accounts/:accountId endpoint -> berhasil', async () => {
        try {
            let { body, statusCode } = await request(app).get(
                '/api/v1/accounts/1'
            );

            expect(statusCode).toBe(200);

            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('namaBank');
            expect(body.data).toHaveProperty('noRek');
            expect(body.data).toHaveProperty('saldo');
            expect(body.data).toHaveProperty('idPengguna');

            expect(body.data.id).toBe(rekening[0].id);
            expect(body.data.namaBank).toBe(rekening[0].namaBank);
            expect(body.data.noRek).toBe(rekening[0].noRek);
            expect(body.data.idPengguna).toBe(rekening[0].idPengguna);
        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('test dapetin rekening dengan id yang invalid -> error', async () => {
        try {
            let id = -1;
            let { body } = await request(app).get(`/api/v1/accounts/${id}`);
        } catch (error) {
            expect(error).toBe('id nggak ada!');
        }
    });
});
