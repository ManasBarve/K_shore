const map = L.map('map').setView([15.3173, 75.7139], 7); // Center on Karnataka

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to load GeoJSON and style it
function loadLayer(url, style, popupField) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            L.geoJSON(data, {
                style: style,
                onEachFeature: (feature, layer) => {
                    if (popupField && feature.properties[popupField]) {
                        layer.bindPopup(`${popupField}: ${feature.properties[popupField]}`);
                    }
                }
            }).addTo(map);
        });
}

// Load layers
loadLayer('data/state.geojson', { color: '#333', weight: 3 }, 'state_name');
loadLayer('data/district.geojson', { color: 'green', weight: 1 }, 'district');
loadLayer('data/watershed.geojson', { color: 'blue', weight: 1 }, 'watershed_name');
loadLayer('data/river.geojson', { color: 'skyblue', weight: 2 });
loadLayer('data/activity_points.geojson', null, 'activity');
