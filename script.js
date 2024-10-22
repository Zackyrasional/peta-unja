// Fungsi untuk pencarian lokasi
function searchLocation() {
    var location = document.getElementById('search-location').value;
    alert('Mencari lokasi: ' + location);
    // Tambahkan logika pencarian di peta
}

// Fungsi untuk menambahkan lokasi baru oleh admin
function addLocation() {
    var name = document.getElementById('new-building-name').value;
    var description = document.getElementById('new-building-description').value;

    if (name && description) {
        alert('Lokasi baru ditambahkan: ' + name);
        // Logika penyimpanan data ke database bisa ditambahkan di sini
    } else {
        alert('Harap isi semua field!');
    }
}

// Fungsi untuk menambahkan acara baru oleh admin
function addEvent() {
    var eventName = document.getElementById('event-name').value;
    var eventDate = document.getElementById('event-date').value;
    var eventTime = document.getElementById('event-time').value;

    if (eventName && eventDate && eventTime) {
        alert('Acara baru ditambahkan: ' + eventName + ' pada ' + eventDate + ' jam ' + eventTime);
        // Logika penyimpanan data acara ke database bisa ditambahkan di sini
    } else {
        alert('Harap isi semua field!');
    }
}

// Fungsi untuk login admin
function adminLogin() {
    var username = document.getElementById('admin-username').value;
    var password = document.getElementById('admin-password').value;

    if (username === 'admin' && password === 'admin123') {
        alert('Login berhasil!');
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
    } else {
        alert('Username atau password salah!');
    }
}
