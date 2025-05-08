let map, infoWindow, directionsService, directionsRenderer, autocomplete;
let userLocation;

const subLocations = {
    buildingA: {
        direct: { name: "Gedung A", lat: -1.614850, lng: 103.519641 },
        parking: { name: "Parkir Gedung A", lat: -1.615081, lng: 103.519658 }
    },
    fstB: {
        direct: { name: "Gedung FST B", lat: -1.615590303751922, lng: 103.51976420258595 },
        parking: { name: "Parkir Gedung FST B", lat: -1.616059255212965, lng: 103.51990580855811 }
    }
};

function selectRole(role) {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.map-container').style.display = 'block';

    if (role === 'guest') {
        document.querySelector('.guest-options').style.display = 'flex';
        document.querySelector('.member-options').style.display = 'none';
        document.getElementById("option-select").style.display = "inline-block";
    } else {
        document.querySelector('.guest-options').style.display = 'none';
        document.querySelector('.member-options').style.display = 'flex';
        document.getElementById("member-action-select").style.display = "inline-block";
    }
    
    initMap();
}

function goBack() {
    document.querySelector('.map-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'flex';
}

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById("campus-map"), {
        center: { lat: -1.607697, lng: 103.520159 },
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        zoomControl: true,
    });

    directionsRenderer.setMap(map);
    infoWindow = new google.maps.InfoWindow();

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
            () => handleLocationError()
        );
    } else {
        handleLocationError();
    }

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"), 
        { fields: ["place_id", "geometry", "name"] }
    );
    autocomplete.addListener("place_changed", onPlaceChanged);
}

function handleLocationError() {
    const defaultLocation = { lat: -1.607697, lng: 103.520159 };
    map.setCenter(defaultLocation);
    userLocation = defaultLocation;
}

function addMarker(position, title) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new google.maps.Size(30, 30),
        },
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${title}</h3>`,
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        addMarker(place.geometry.location, place.name);
        calculateRoute(place.geometry.location.lat(), place.geometry.location.lng());
    } else {
        alert("Lokasi tidak ditemukan. Silakan pilih lokasi yang valid.");
    }
}

function showAdditionalOptions() {
    const locationSelect = document.getElementById("location-select").value;
    const optionSelect = document.getElementById("option-select");

    if (locationSelect) {
        optionSelect.style.display = "inline-block";
    } else {
        optionSelect.style.display = "none";
    }
}

function goToSelectedOption() {
    const location = document.getElementById("location-select").value;
    const option = document.getElementById("option-select").value;

    if (location && option) {
        const selectedSubLocation = subLocations[location][option];
        map.setCenter({ lat: selectedSubLocation.lat, lng: selectedSubLocation.lng });
        addMarker({ lat: selectedSubLocation.lat, lng: selectedSubLocation.lng }, selectedSubLocation.name);
        calculateRoute(selectedSubLocation.lat, selectedSubLocation.lng);
    }
}

function showMemberActions() {
    const buildingSelect = document.getElementById("building-select").value;
    const memberActionSelect = document.getElementById("member-action-select");

    if (buildingSelect) {
        memberActionSelect.style.display = "inline-block";
    } else {
        memberActionSelect.style.display = "none";
    }
}

function goToSelectedMemberOption() {
    const building = document.getElementById("building-select").value;
    const action = document.getElementById("member-action-select").value;

    if (building && action) {
        const selectedSubLocation = subLocations[building][action];
        map.setCenter({ lat: selectedSubLocation.lat, lng: selectedSubLocation.lng });
        addMarker({ lat: selectedSubLocation.lat, lng: selectedSubLocation.lng }, selectedSubLocation.name);
        calculateRoute(selectedSubLocation.lat, selectedSubLocation.lng);
    }
}

function calculateRoute(destinationLat, destinationLng) {
    const request = {
        origin: userLocation,
        destination: { lat: destinationLat, lng: destinationLng },
        travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
        if (status === "OK") {
            directionsRenderer.setDirections(result);
        } else {
            alert("Tidak dapat menampilkan rute. Silakan coba lokasi lain atau periksa koneksi internet Anda.");
        }
    });
}
