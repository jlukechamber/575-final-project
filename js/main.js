//initilize map and set center of map with coordinates
var map2;
/*function createmap(){

 map2 = L.map('map2', {
    center: [-152.4691482, 36.1755150],
    zoom: 6,
    minzoom:5.2,
    maxzoom:6.7
});
};*/
//function to create the Leaflet map
function createMap() {
    //create the map
    map2 = L.map('map2', {
        center: [-152.4691482, 36.1755150],
        zoom: 2,
        minZoom: 2,
        maxZoom: 15,
    scrollWheelZoom: false,
    doubleClickZoom: true

    });


    //Step 1: add the openstreet map tilelayer
    L.tileLayer('https://api.mapbox.com/styles/v1/ajanderson26/cl9yx108p002o15r70hbmu73w/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWphbmRlcnNvbjI2IiwiYSI6ImNsOXl3dnIzdzAwNmszcW1yMmhrZjlsNHUifQ.XCys49mvEy12hmZV60I_9A', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData();
};

//what link to useee here? 
/*L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2);
*/

function getData() {
    //load the data--> geojson file can be switched out for mapand.geojson
    fetch("data/region_line_straight.geojson")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
        })
};


//createMap();
document.addEventListener('DOMContentLoaded', createMap)