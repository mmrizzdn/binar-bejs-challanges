// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const app = require('../../app');
const request = require('supertest');
const bcrypt = require('bcrypt')

let pengguna = [];

describe('test tambahPengguna()', () => {
    let nama = 'ammar';
    let email = 'ammar@mail.com';
    let kataSandi = 'ammar123';
    let tipeIdentitas = 'ktp';
    let noIdentitas = '123456789';
    let alamat = 'tegal';

    let nama2 = 'lulu';
    let email2 = 'lulu@mail.com';
    let kataSandi2 = 'lulu123';
    let tipeIdentitas2 = 'ktp';
    let noIdentitas2 = '123456781';
    let alamat2 = 'tangerang';
    
    test('test POST /api/v1/users/auth/register endpoint -> berhasil', async () => {
        try {
            let { statusCode, body } = await request(app)
                .post('/api/v1/users/auth/register')
                .send({
                    nama,
                    email,
                    kataSandi,
                    tipeIdentitas,
                    noIdentitas,
                    alamat
                });

            pengguna.push(body.data);

            // let hashed = await bcrypt.hash(kataSandi, 10);

            expect(statusCode).toBe(201);

            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('nama');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('Profil');
            expect(body.data.Profil).toHaveProperty('id');
            expect(body.data.Profil).toHaveProperty('tipeIdentitas');
            expect(body.data.Profil).toHaveProperty('noIdentitas');
            expect(body.data.Profil).toHaveProperty('alamat');

            expect(body.data.nama).toBe(nama);
            expect(body.data.email).toBe(email);
            expect(body.data.Profil.tipeIdentitas).toBe(tipeIdentitas);
            expect(body.data.Profil.noIdentitas).toBe(noIdentitas);
            expect(body.data.Profil.alamat).toBe(alamat);
        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('test email udah dipake -> error', async () => {
        try {
            let { statusCode } = await request(app).post('/api/v1/users/auth/register').send({
                nama,
                email,
                kataSandi,
                tipeIdentitas,
                noIdentitas,
                alamat
            });

            expect(statusCode).toBe(400);
        } catch (error) {
            expect(error).toBe('email udah dipake!');
        }
    });

    test('test nomer identitas udah dipake -> error', async () => {
        try {
            let { statusCode } = await request(app).post('/api/v1/users/auth/register').send({
                nama2,
                email2,
                kataSandi2,
                tipeIdentitas2,
                noIdentitas,
                alamat2
            });

            expect(statusCode).toBe(400);
        } catch (error) {
            expect(error).toBe('nomer identitas udah dipake!');
        }
    });
});

describe('test daftarPengguna()', () => {
    test('test  GET /api/v1/users endpoint -> berhasil', async () => {
        try {
            let { body, statusCode } = await request(app).get('/api/v1/users');

            expect(statusCode).toBe(200);

            pengguna.forEach((listPengguna, i) => {
                expect(body.data[i]).toHaveProperty('id');
                expect(body.data[i]).toHaveProperty('nama');
                expect(body.data[i]).toHaveProperty('email');
                expect(body.data[i]).toHaveProperty('kataSandi');

                expect(body.data[i].id).toBe(listPengguna.id);
                expect(body.data[i].nama).toBe(listPengguna.nama);
                expect(body.data[i].email).toBe(listPengguna.email);
                expect(body.data[i].kataSandi).toBe(listPengguna.kataSandi);
            });
        } catch (error) {
            expect(error).toBe('error');
        }
    });
});

describe('test detailPengguna(:id)', () => {
    test('test GET /api/v1/users/:userId endpoint -> berhasil', async () => {
        try {
            let { body, statusCode } = await request(app).get(
                '/api/v1/users/1'
            );

            expect(statusCode).toBe(200);

            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('nama');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('kataSandi');
            expect(body.data).toHaveProperty('Profil');
            expect(body.data.Profil).toHaveProperty('tipeIdentitas');
            expect(body.data.Profil).toHaveProperty('noIdentitas');
            expect(body.data.Profil).toHaveProperty('alamat');
            expect(body.data.Profil).toHaveProperty('idPengguna');

            expect(body.data.id).toBe(pengguna[0].id);
            expect(body.data.nama).toBe(pengguna[0].nama);
            expect(body.data.email).toBe(pengguna[0].email);
            expect(body.data.kataSandi).toBe(pengguna[0].kataSandi);
            expect(body.data.Profil.tipeIdentitas).toBe(
                pengguna[0].Profil.tipeIdentitas
            );
            expect(body.data.Profil.noIdentitas).toBe(
                pengguna[0].Profil.noIdentitas
            );
            expect(body.data.Profil.alamat).toBe(pengguna[0].Profil.alamat);
            expect(body.data.Profil.idPengguna).toBe(
                pengguna[0].Profil.idPengguna
            );
        } catch (error) {
            expect(error).toBe('error');
        }
    });

    test('test dapetin pengguna dengan id yang invalid -> error', async () => {
        try {
            let id = -1;
            let { body } = await request(app).get(`/api/v1/users/${id}`);
        } catch (error) {
            expect(error).toBe('id nggak ada!');
        }
    });
});
