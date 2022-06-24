var map = L.map('map').setView([46.227638, 2.213749], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [70,70],
        //iconAnchor:   [50, 00], //22 94
        popupAnchor:  [0, -15]
    }
});


var citiesTable = document.getElementsByClassName('city');

for (let i=0; i<citiesTable.length; i++) {   

    let newLeafIcon = new LeafIcon({iconUrl: `http://openweathermap.org/img/wn/${citiesTable[i].dataset.cityicon}@2x.png`});
    
    var marker =new L.marker([citiesTable[i].dataset.citylat, citiesTable[i].dataset.citylng], {icon: newLeafIcon}).addTo(map);
    marker.bindPopup(citiesTable[i].dataset.citymessage);
}