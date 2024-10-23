let map, infoWindow, autocomplete, directionsService, directionsRenderer;
let userLocation;

function initMap() {
    // Mempersiapkan Directions API
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    // Inisialisasi peta
    map = new google.maps.Map(document.getElementById("campus-map"), {
        center: { lat: -1.6109265419079182, lng: 103.51806852993525 },
        zoom: 17,
    });

    directionsRenderer.setMap(map);

    // Mempersiapkan InfoWindow
    infoWindow = new google.maps.InfoWindow();

    // Geolocation: deteksi lokasi pengguna
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(userLocation);
                addMarker(userLocation, "Lokasi Anda");
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    alert("Geolocation tidak diizinkan. Silakan aktifkan lokasi di pengaturan browser.");
                }
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // Autocomplete: pencarian tempat
    const input = document.getElementById("search-location");
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);

    // Ketika tempat dipilih dari autocomplete
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
            window.alert("Tidak ada rincian lokasi yang tersedia untuk: '" + place.name + "'");
            return;
        }
        map.setCenter(place.geometry.location);
        map.setZoom(17);
        addMarker(place.geometry.location, place.name);
    });

    // Memeriksa status izin geolokasi
    navigator.permissions.query({name: 'geolocation'}).then(function(result) {
        if (result.state === 'denied') {
            alert("Geolocation telah diblokir. Silakan aktifkan izin lokasi di pengaturan browser.");
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: Layanan geolokasi gagal."
            : "Error: Browser Anda tidak mendukung geolokasi."
    );
    infoWindow.open(map);
}

function addMarker(position, title) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${title}</h3><button onclick="calculateRoute(${position.lat()}, ${position.lng()})">Lihat Rute</button>`,
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

function calculateRoute(destinationLat, destinationLng) {
    const request = {
        origin: userLocation,
        destination: { lat: destinationLat, lng: destinationLng },
        travelMode: "DRIVING",
    };

    directionsService.route(request, (result, status) => {
        if (status === "OK") {
            directionsRenderer.setDirections(result);
        } else {
            alert("Tidak dapat menampilkan rute: " + status);
        }
    });
}

// Fungsi untuk admin menambah lokasi
function addLocation() {
    alert("Fungsi tambah lokasi oleh admin akan diimplementasikan di sini.");
}

// Fungsi untuk admin mengedit lokasi
function editLocation() {
    alert("Fungsi edit lokasi oleh admin akan diimplementasikan di sini.");
}

// Fungsi untuk admin menghapus lokasi
function deleteLocation() {
    alert("Fungsi hapus lokasi oleh admin akan diimplementasikan di sini.");
}
