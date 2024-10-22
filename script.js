l// Fungsi untuk menampilkan peta dengan Google Maps API
function initMap() {
    // Koordinat kampus (lokasi yang diberikan)
    var kampusLocation = {lat: -1.6109265419079182, lng: 103.51806852993525}; // Koordinat kampus kamu

    // Membuat peta baru
    var map = new google.maps.Map(document.getElementById('campus-map'), {
        zoom: 15, // Tingkat zoom peta
        center: kampusLocation // Lokasi yang dijadikan pusat peta
    });

    // Menambahkan marker di lokasi kampus
    var marker = new google.maps.Marker({
        position: kampusLocation,
        map: map,
        title: 'Lokasi Kampus'
    });
}

// Fungsi untuk pencarian lokasi (placeholder, logika bisa ditambah)
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
