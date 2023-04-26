//// array containing locations
//actually do we even need this because the places array is redone in the fly variable? 
function createArray(lat,long){
    //var ??  places for now 
    var places = [
        {
            id: "mBody",
            location:[-154.1422696, 35.7988407],
            zoom: 9
        },
        {
            id: "Conciousness",
            location:[-153.4242405, 36.1905128],
            zoom: 9
        },
        {
            id: "Subjectivity",
            location:[-152.6586802,36.7255401],
            zoom: 9
        },
        {
            id: "Ego",
            location: [-151.6775737,36.4988286],
            zoom: 9
        },
        {
            id: "Antiego",
            location: [-151.1275595, 35.9832893],
            zoom: 9
        },
        {
            id: "Other",
            location: [-151.1461410,35.4613327],
            zoom: 9 
        },
        {
            id: "Will",
            location: [-151.5809496,35.7875796],
            zoom: 9
        },
        {
         id: 'Freendom',
         location: [-152.4691482, 36.1755150],
         zoom: 9   
        },
        {
            id: "Unconsciousness",
            location: [-153.3573469,35.5006736],
            zoom: 9
        },
        {
            id: "Objectivity",
            location: [-152.5100277,35.6125384],
            zoom: 9
        }
    ];
}

// create location map
function createLocationMap(){
    locationMap = L.map('locationMap',{
        center: [-152.4691482, 36.1755150],
        zoom: 5,
        maxZoom: 12,
        minZoom: 5,
        scrollWheelZoom: false,
        zoomControl: false});


    };
//declare map variable 
var map;


//step 1 create map
function createMap() {

    //create the map (L. is leaflet)
    map = L.map('mapid', {
        center: [36.1905128,-153.4242405],
        zoom: 15,
        //set zoom level constraints
        //THIS WILL NEED TO CHANGE
        minZoom: 9,
        maxZoom: 3
        //add panning constraints
        // set panning constraint
        //we need to set panning constraints

    });

//     //add OSM base tilelayer
//     L.tileLayer('https://api.mapbox.com/styles/v1/randimaes/cleq9kh7c000q01lmxdwexoou/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmFuZGltYWVzIiwiYSI6ImNsYTJveDBuMzBqOTkzcG1oZ3dyNXE5ZjEifQ.KopBuoAxGQO2d1NO_sNSOA', {
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
//     }).addTo(map);

//     //call getData function
    getData();
 };


//import GeoJSON data
function getData() {
    //load the data
    fetch("data/mind_continents.geojson")
        .then(function (response) {
            return response.json();
        })
        .then(function(json){
            console.log(json)
            var layer = L.geoJson(json,{

            })
            layer.addTo(map)

        })
        // .then(function (json) {
        //     var attributes = processData(json);
        //     console.log(attributes)
        //     minValue = calculateMinValue(json);
        //     //call function to create proportional symbols
        //     createPropSymbols(json, attributes);
        //     createSequenceControls(attributes);
        //     createLegend(attributes);

        // })
};

// create array containing flyTo locations
//should this 
var fly= [
        {
            id: "mBody",
            location:[-154.1422696, 35.7988407],
            zoom: 9
        },
        {
            id: "Conciousness",
            location:[-153.4242405, 36.1905128],
            zoom: 9
        },
        {
            id: "Subjectivity",
            location:[-152.6586802,36.7255401],
            zoom: 9
        },
        {
            id: "Ego",
            location: [-151.6775737,36.4988286],
            zoom: 9
        },
        {
            id: "Antiego",
            location: [-151.1275595, 35.9832893],
            zoom: 9
        },
        {
            id: "Other",
            location: [-151.1461410,35.4613327],
            zoom: 9 
        },
        {
            id: "Will",
            location: [-151.5809496,35.7875796],
            zoom: 9
        },
        {
         id: 'Freendom',
         location: [-152.4691482, 36.1755150],
         zoom: 9   
        },
        {
            id: "Unconsciousness",
            location: [-153.3573469,35.5006736],
            zoom: 9
        },
        {
            id: "Objectivity",
            location: [-152.5100277,35.6125384],
            zoom: 9
        }
    ];


// function to trigger flyTo on scroll
function scroll(){
    fly.forEach(function(item){
        isInPosition(item.id, item.location, item.zoom)
    });
};
createMap();