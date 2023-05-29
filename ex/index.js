window.initMap = function () {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.275760, lng: 127.132564 },
        zoom: 17,
    });
    const malls = [
        { label: "A", name: "강남대역", lat: 37.27018, lng: 127.12610 },
        { label: "B", name: "기흥역", lat: 37.27545, lng: 127.11664 },
        { label: "C", name: "이공관", lat: 37.27705, lng: 127.13424 },
        { label: "D", name: "자취촌", lat: 37.27741, lng: 127.12896 },
    ];
    malls.forEach(({ label, name, lat, lng }) => {
        const marker = new google.maps.Marker({
            position: { lat, lng },
            label,
            map,
        });
        const infoWindow = new google.maps.InfoWindow({
            content: name,
        });
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });

    window.addMarker = function () {
        const latitudeInput = document.getElementById("latitude");
        const longitudeInput = document.getElementById("longitude");

        const lat = parseFloat(latitudeInput.value);
        const lng = parseFloat(longitudeInput.value);

        if (isNaN(lat) || isNaN(lng)) {
            alert("Please enter valid latitude and longitude values.");
            return;
        }

        const marker = new google.maps.Marker({
            position: { lat, lng },
            map,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: "New Marker",
        });
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

        map.setCenter({ lat, lng });
    };
};
