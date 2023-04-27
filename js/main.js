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


// create location map --> this will be used for flyover?? Do we need this chuck of code?
function createLocationMap(){
    locationMap = L.map('locationMap',{
        center: [36.1905128,-153.4242405],
        zoom: 5,
        maxZoom: 12,
        minZoom: 5,
        scrollWheelZoom: false,
        zoomControl: false});


    };
//declare map variable 
var map;
};



//step 1 create map
function createMap() {

    //create the map (L. is leaflet)
    map = L.map('mapid', {
        center: [36.1905128,-153.4242405],
        zoom: 15,
        //set zoom level constraints
        //THIS WILL NEED TO CHANGE
        minZoom: 9,
        maxZoom: 1
        //add panning constraints
        // set panning constraint
        //we need to set panning constraints

    });

//call getData function
    getData();
 };
// get user location if user selects yes button
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLocation);
    };
};

// set lat long if user denies location access or does not click either button
function noLocation() { 
    var lat = 39.71;
    var long = -105.06;
    locations = createArray(lat, long);
    scrollLocation(null, locations);
};

// set lat long if user allows location access
function saveLocation(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    locations = createArray(lat, long);
    scrollLocation(null, locations);
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
    function scroll(){
        fly.forEach(function(fly){
            isInPosition(fly.id, fly.location, fly.zoom, fly.scrollLocation)
        });
    };
    
    function isInPosition(id, location, zoom){
        
        // get element and element's property 'top'
        var block1 = document.getElementById(id);
        var rect = block1.getBoundingClientRect();
        y = rect.top;
    
        // set the top margin as a ratio of innerHeight
        var topMargin = window.innerHeight / 2;
    
        // call flyTo when top of element is halfway up innerHeight
        if ((y-topMargin) < 0 && y > 0){
            sliderMap.flyTo(location, zoom, {
                animate: true,
                duration: 2 // in seconds
            });
        };
    };
//changed "item" to "places" --> it might still need to be "item" but i am trying to figure things out
//also I am not sure if this function should be directly below the fly array or the places array
    function scrollLocation(){
        locations.forEach(function(fly){
            locatorIsInPosition(fly.id, fly.location, fly.zoom)
        });
    };
    
    function locatorIsInPosition(id, location, zoom){
        
        // get element and element's property 'top'
        var locText = document.getElementById(id);
        var rect = locText.getBoundingClientRect();
        y = rect.top;
    
        // set the top margin as a ratio of innerHeight
        var topMargin = window.innerHeight / 2;
    
        // call flyTo when top of element is halfway up innerHeight
        if ((y-topMargin) < 0 && y > 0){
            locationMap.flyTo(location, zoom, {
                animate: true,
                duration: 2 // in seconds
            });
        };
    };
    // function to trigger flyTo on scroll

   
    //this section of code  creates the full map at end of the scroll ****Copied from Jake's code with minor edits
   /* function createFinalMap(){
        //create the map
        finalMap = L.map('finalMap', {
            //map parameters
            center: [36.1905128,-153.4242405],
            zoom: 5,
            maxZoom: 12,
            minZoom: 5,
            scrollWheelZoom: false,
            //needed to get rid zoom in order to move it 
            zoomControl:false,
            //constrain pan to data
            maxBounds: [
                [60, -155],
                [15, -45]
                ],
        });
    
        // add zoom with home button
        var zoomHome = L.Control.zoomHome({position:'bottomright'});
        zoomHome.addTo(finalMap);
    
    
        //call getData function
        getData();
    };
    //function to retrieve the data
function getData(){
    //adds the IDA points layer
    fetch("data/mind_continents.geojson)
        .then(function(response){
            return response.json();
        })        
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            IDApoints = L.geoJson(json,{
                //creates IDA pop ups
                onEachFeature:function(feature, layer){
                    var popupContent = createPopupContent(feature);
                    layer.bindPopup(popupContent)
                },
                //convert the IDA data from points to layers to give us more symbology control
                pointToLayer: pointToLayer
            }).addTo(finalMap);
            //call the style function within the Leaflet setStyle funciton, dynamically changing the IDA point style based on where the user is in the page
            IDApoints.setStyle(style);
        });
};
*/

// function to trigger flyTo on scroll
function scroll(){
    fly.forEach(function(places){
        isInPosition(places.id, places.location, places.zoom)
    });
};
createMap();