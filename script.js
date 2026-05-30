// ==========================================
// Bagian 1: Fungsi Validasi Modular 
// ==========================================
function NameValidate(nama) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nama); // TRUE jika benar huruf & spasi
}

function EmailValidate(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); // TRUE jika format email benar
}

function NotelValidate(notel) {
    const regex = /^[0-9]{10,14}$/;
    return regex.test(notel); // TRUE jika nomor hp benar (10-14 digit)
}

function JumlahValidate(Jumlah) {
    const regexAngka = /^[0-9]+$/;
    // TRUE jika dia angka murni DAN nilainya di atas 0
    return regexAngka.test(Jumlah) && parseInt(Jumlah) > 0;
}

// ==========================================
// Bagian 2: Event Listener untuk Submit Form
// ==========================================
const formPesanan = document.getElementById("orderForm");

if(formPesanan) {
    formPesanan.addEventListener("submit", function (e) {
        // Mencegah halaman ter-refresh otomatis saat disubmit
        e.preventDefault();

        // 1. Mengambil value dari masing-masing inputan HTML
        const nama = document.getElementById("custName").value.trim();
        const email = document.getElementById("custEmail").value.trim();
        const notel = document.getElementById("custNotel").value.trim();
        const jenis = document.getElementById("jenisCetak").value;
        const ukuran = document.getElementById("ukuranCetak").value;
        const Jumlah = document.getElementById("jumlah").value.trim();
        const fileUpload = document.getElementById("File").value;

        // 2. Membersihkan pesan error sebelumnya
        const idsError = ['errName', 'errEmail', 'errNotel', 'errJenis', 'errUkuran', 'errJumlah', 'errFile'];
        idsError.forEach(id => {
            const elemen = document.getElementById(id);
            if (elemen) elemen.innerText = "";
        });
        
        const successBox = document.getElementById("successBox");
        if (successBox) successBox.style.display = "none";

        let adaError = false;

        // 3. Proses Cek Validasi (Tanda `!` dipindahkan ke sini)
        
        // Validasi Nama
        if (nama === "") {
            document.getElementById("errName").innerText = "*Nama pelanggan wajib diisi.";
            adaError = true;
        } else if (!NameValidate(nama)) { //  "Jika NAMA TIDAK VALID..."
            document.getElementById("errName").innerText = "*Nama hanya boleh berisi huruf alfabet.";
            adaError = true;
        }

        // Validasi Email
        if (email === "") {
            document.getElementById("errEmail").innerText = "*Email pelanggan wajib diisi.";
            adaError = true;
        } else if (!EmailValidate(email)) { //  "Jika EMAIL TIDAK VALID..."
            document.getElementById("errEmail").innerText = "*Format email tidak valid (Contoh: james@gmail.com).";
            adaError = true;
        }

        // Validasi Notel
        if (notel === "") {
            document.getElementById("errNotel").innerText = "*Nomor telepon wajib diisi.";
            adaError = true;
        } else if (!NotelValidate(notel)) { //  "Jika NOTEL TIDAK VALID..."
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

        // Validasi Jumlah
        if (Jumlah === "") {
            document.getElementById("errJumlah").innerText = "*Jumlah pesanan wajib diisi.";
            adaError = true;
        } else if (!JumlahValidate(Jumlah)) { //  "Jika JUMLAH TIDAK VALID..."
            document.getElementById("errJumlah").innerText = "*Jumlah harus angka murni dan lebih dari 0.";
            adaError = true;
        }

        // Validasi File Upload
        if (fileUpload === "") {
            document.getElementById("errFile").innerText = "*Wajib mengunggah file Anda.";
            adaError = true;
        }

        // 4. Hasil Akhir
        if (!adaError) {
            if(successBox) successBox.style.display = "block";
            formPesanan.reset();
            const tampilHarga = document.getElementById("tampilHarga");
            if(tampilHarga) tampilHarga.innerText = "Rp 0";
        }
    })
}

// ==========================================
// Bagian 3: Menghitung Total Harga Otomatis
// ==========================================
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