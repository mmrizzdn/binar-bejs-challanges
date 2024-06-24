-- MUHAMMAD AMMAR IZZUDIN
-- BEJS
-- KM 6

-- DDL

-- Bikin Dataase
create database banking_system;

-- Bikin tabel nasabah
create table nasabah (
    id bigserial primary key,
    nama varchar(255),
    alamat varchar(255),
    no_hp varchar(255),
    email varchar(255)
);

-- Bikin tabel rekening/akun
create table rekening (
    id bigserial primary key,
    jenis_rek varchar(50),
    no_rek varchar(255),
    saldo decimal(15, 2),
    id_nasabah bigint,
    foreign key (id_nasabah) references nasabah(id)
);

-- Bikin tabel transaksi
create table transaksi (
    id bigserial primary key,
    jenis_transaksi varchar(20),
    jumlah_uang decimal(15, 2),
    tgl_transaksi date,
    id_rek bigint,
    foreign key (id_rek) references rekening(id)
);



-- DML (CRUD)

-- Create data
-- Masukin data nasabah
insert into nasabah (nama, alamat, no_hp, email) VALUES
    ('Ammar', 'Tegal', '08961234', 'ammar@mail.com'),
    ('Izzudin', 'Tangerang', '08511234', 'izzudin@mail.com'),
    ('Muhammad', 'Medan', '08231234', 'muhammad@mail.com');

-- Masukin data rekening/akun
insert into rekening (jenis_rek, no_rek, saldo, id_nasabah) VALUES
    ('Tabungan', '987655432', 15000000.00, 1),
    ('Tabungan', '165165154', 20000000.00, 2),
    ('Giro', '49840649',  375000000.00, 1),
    ('Giro', '10478498', 100000000.00, 3);

-- Masukin data transaksi
insert into transaksi (jenis_transaksi, jumlah_uang, tgl_transaksi, id_rek) VALUES
    ('Withdraw', 1000000.00, '2024-03-01', 3),
    ('Deposit', 25000000.00, '2024-03-16', 1),
    ('Deposit', 5700000.00, '2024-03-17', 3),
    ('Withdraw', 500000.00, '2024-02-17', 4),
    ('Deposit', 5700000.00, '2024-03-19', 4);

-- Read data
-- Nampilin semua data nasabah
select * from nasabah;

-- Nampilin semua data rekening/akun dengan jenis rekening giro
select * from rekening where jenis_rek = 'Giro' ;

-- Nampilin semua data transaksi dengan ID rekening 3
select * from transaksi where id_rek = 3;

-- Update data
-- Update data alamat nasabah dengan ID 2
update nasabah set alamat = 'Cilacap' where id = 1;

-- Mengubah saldo rekening dengan jenis rekening tabungan
update rekening set saldo = 50000000.00 where jenis_rek = 'Tabungan';

-- Mengubah nomor handphone nasabah dengan id 3
update nasabah set no_hp = '089643246' where id = 3;

-- Delete data
-- Menghapus nasabah dengan ID 1
delete from nasabah where id = 1;

-- Menghapus rekening/akun dengan ID 1 beserta transaksi yang terkait
delete from rekeneing where id = 4;