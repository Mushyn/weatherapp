var map = L.map('map').setView([46.227638, 2.213749], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [50,50],
        //iconAnchor:   [50, 00], //22 94
        popupAnchor:  [0, -15],
        className : 'popup',
    }
});


var citiesTable = document.getElementsByClassName('city');

for (let i=0; i<citiesTable.length; i++) {   

    // - icons OpenWeather - //let newLeafIcon = new LeafIcon({iconUrl: `http://openweathermap.org/img/wn/${citiesTable[i].dataset.cityicon}@2x.png`});
    
    let newLeafIcon = new LeafIcon({iconUrl: `/images/${citiesTable[i].dataset.cityicon}.png`});

    var marker =new L.marker([citiesTable[i].dataset.citylat, citiesTable[i].dataset.citylng], {icon: newLeafIcon}).addTo(map);
    marker.bindPopup(citiesTable[i].dataset.citymessage);
}