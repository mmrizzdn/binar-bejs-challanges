// MUHAMMAD AMMAR IZZUDIN

// Manggil function nambahSaldo() ketika klik tombol "Tambah Saldo" berdasarkan id elemen
document.getElementById('nambahBtn').addEventListener('click', () => {
	nambahSaldo();
});

// Manggil function ngurangSaldo() ketika klik tombol "Krangi Saldo" berdasarkan id elemen
document.getElementById('ngurangBtn').addEventListener('click', () => {
	ngurangSaldo();
});

// Deklarasi variabel saldo dengan nilai awal 0
let saldo = 0;

// Deklarasi fungsi nambahSaldo() menggunakan window.prompt() buat nambah saldo
const nambahSaldo = () => {
	let nambahin = parseFloat(
		window.prompt('Masukin jumlah saldo yang mau kamu tambahin: ')
	);

    // Jika nilai varaibel nambahin merukpakan angka dan lebih dari 0
	if (!isNaN(nambahin) && nambahin > 0) {
		saldo += nambahin;
		alert(
			`Yeay! Saldo kamu berhasil ditambahin :D. Saldo kamu sekarang adalah Rp. ${saldo};.`
		);
	} else {
		alert('Maaf, Jumlah saldo yang kamu masukin nggak valid :(.');
	}
};

//  Deklarasi fungsi ngurangSaldo() menggunakan window.prompt() buat ngurangin saldo
const ngurangSaldo = () => {
	let ngurangin = parseFloat(
		window.prompt('Masukin jumlah saldo yang mau kamu kurangin: ')
	);

    // Jika nilai varaibel ngurangin merukpakan angka dan lebih dari 0
	if (!isNaN(ngurangin) && ngurangin > 0) {
		if (ngurangin <= saldo) {
			saldo -= ngurangin;
			alert(
				`Saldo kamu telah dikurangi. Saldo kamu sekarang adalah Rp. ${saldo};.`
			);
		} else {
			alert('Yahhh...Maaf, Jumlah saldo kamu nggak cukup nih :(');
		}
	} else {
		alert('Maaf, Jumlah saldo yang kamu masukin nggak valid :(.');
	}
};
