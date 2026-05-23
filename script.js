// Bagian 1: Fungsi Valdasi Modular
function NameValidate(nama) {
    const regex = /^[a-zA-Z\s]+$/;
    return !regex.test(nama);
}

function EmailValidate(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(email);
}

function NotelValidate(notel) {
    const regex = /^[0-9]{10,14}$/;
    return !regex.test(notel);
}

function JumlahValidate(Jumlah) {
    const regexAngka = /^[0-9]+$/;
    return !regexAngka.test(Jumlah) || parseInt(Jumlah) <= 0;
}
// Bagian 2: Event Listener untuk Submit Form

// Mengambil tag form berdasarkan ID-nya
const formPesanan = document.getElementById("orderForm");

// Pastikan form-nya ada di halaman ini sebelum menambahkan EventListener
if(formPesanan) {
    formPesanan.addEventListener("submit", function (e) {
        // Mencegah halaman ter-refresh otomatis saat disubmit
        e.preventDefault();

        // 1. Mengambil value dari masing-masing inputann HTML
        const nama = document.getElementById("custName").value.trim();
        const email = document.getElementById("custEmail").value.trim();
        const notel = document.getElementById("custNotel").value.trim();
        const jenis = document.getElementById("jenisCetak").value;
        const ukuran = document.getElementById("ukuranCetak").value;
        const Jumlah = document.getElementById("jumlah").value.trim();
        const fileUpload = document.getElementById("File").value;

        // 2. Membersihkan pesan error sebelumnya secara aman
        const idsError = ['errName', 'errEmail', 'errNotel', 'errJenis', 'errUkuran', 'errJumlah', 'errFile'];
        idsError.forEach(id => {
            const elemen = document.getElementById(id);
            if (elemen) elemen.innerText = "";
        });
        // Menyembunyikan success box jika sebelumnya sedang tampil
        const successBox = document.getElementById("successBox");
        if (successBox) successBox.style.display = "none";

        // Variabel penanda error
        let adaError = false;

        // 3. Proses Cek Validasi
        // validasi Nama
        if (nama === "") {
            document.getElementById("errName").innerText = "*Nama pelanggan wajib diisi.";
            adaError = true;
        } else if (NameValidate(nama)) {
            document.getElementById("errName").innerText = "*Nama hanya boleh berisi huruf alfabet.";
            adaError = true;
        }

        // Validasi Email
        if (email === "") {
            document.getElementById("errEmail").innerText = "*Email pelanggan wajib diisi.";
            adaError = true;
        } else if (EmailValidate(email)) {
            document.getElementById("errEmail").innerText = "*Format email tidak valid (Contoh: james@gmail.com).";
            adaError = true;
        }

        // Valaidasi Notel
        if (notel === "") {
            document.getElementById("errNotel").innerText = "*Nomor telepon wajib diisi.";
            adaError = true;
        } else if (NotelValidate(notel)) {
            document.getElementById("errNotel").innerText = "*Nomor telepon harus angka murni (10-14).";
            adaError = true;
        }

        // Validasi Dropdown Jenis
        if (jenis === "") {
            document.getElementById("errJenis").innerText = "*Pilih jenis cetakan terlebih dahulu.";
            adaError = true;
        }

        // Validasi Dropdown Ukuran
        if (ukuran === "") {
            document.getElementById("errUkuran").innerText = "*Pilih ukuran cetakan terlebih dahulu.";
            adaError = true;
        }

        //Validasi Jumlah
        if (Jumlah === "") {
            document.getElementById("errJumlah").innerText = "*Jumlah pesanan wajib diisi.";
            adaError = true;
        } else if (JumlahValidate(Jumlah)) {
            document.getElementById("errJumlah").innerText = "*Jumlah harus angka murni dan lebih dari 0.";
            adaError = true;
        }

        // Validasi File Upload
        if (fileUpload === "") {
            document.getElementById("errFile").innerText = "*Wajib mengunggah file Anda.";
            adaError = true;
        }

        // 4. Hasil Akhir
        // Jika tidak ada error sama sekali, maka sukses!
        if (!adaError) {
            // Menampilkan kotak hijau sukses
            if(successBox) successBox.style.display = "block";

            // Mengosongkan isian form
            formPesanan.reset();

            // Reset harga kembali ke 0
            const tampilHarga = document.getElementById("tampilHarga");
            if(tampilHarga) tampilHarga.innerText = "Rp 0";
        }
    })
}

// Bagian 3: Menghitung Total Harga Otomatis
function hitungTotal() {
    let hargaDasar = parseInt(document.getElementById("jenisCetak").value) || 0;
    let pengaliUkuran = parseFloat(document.getElementById("ukuranCetak").value) || 0;
    let jumlahText = document.getElementById("jumlah").value;
    let hasil = parseInt(jumlahText) || 0;

    let radiosLaminasi = document.getElementsByName("laminasi");
    let hargaLaminasi = 0;
    for(let i = 0; i < radiosLaminasi.length; i++) {
        if(radiosLaminasi[i].checked) {
            hargaLaminasi = parseInt(radiosLaminasi[i].value);
            break;
        }
    }

    let checkboxesFitur = document.querySelectorAll('input[type="checkbox"]:checked');
    let totalFitur = 0;
    checkboxesFitur.forEach(function(cb) {
        totalFitur += parseInt(cb.value);
    });
    
    let totalHarga = (hargaDasar * pengaliUkuran * hasil) + hargaLaminasi + totalFitur;

    const tampilHarga = document.getElementById("tampilHarga");
    if(tampilHarga) {
        tampilHarga.innerText = "Rp " + totalHarga.toLocaleString('id-ID');
    }
}