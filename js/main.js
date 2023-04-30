//// array containing locations
//actually do we even need this because the places array is redone in the fly variable? 
/*function createArray(lat,long){
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
/*


<<<<<<< Updated upstream

    };
//declare map variable 
var map;
*/
//making map and fly global variables
var map;
var fly;


//step 1 create map
function createMap() {

    //create the map (L. is leaflet)
    map = L.map('mapid', {
        center: [36.19,-152.75],
        zoom: 8,
        maxZoom: 12,
        minZoom: 8,
        scrollWheelZoom: false,
        zoomControl: false}
    )};

    getData();

//import GeoJSON data
function getData() {
    //load the data
    fetch("data/mind_continents.geojson")
        .then(function (response) {
            return response.json();
        })
        .then(function(json){
            console.log(json)
            console.log(mapid)
            var layer = L.geoJson(json,{

            })
            layer.addTo(map)

        })
        
};
//This isnt getting used currently 
// create array containing flyTo locations
function createArray(lat,long){
const fly= [
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
        zoom: 5
    },
    {
        id: "Will",
        location: [-151.5809496,35.7875796],
        zoom: 4
    },
    {
     id: 'Freendom',
     location: [-152.4691482, 36.1755150],
     zoom: 3  
    },
    {
        id: "Unconsciousness",
        location: [-153.3573469,35.5006736],
        zoom: 6
    },
    {
        id: "Objectivity",
        location: [-152.5100277,35.6125384],
        zoom: 10
    }
];

return fly;
};

  /*  function scroll(){
        fly.forEach(function(item){
            isInPosition(item.id, item.location, item.zoom, item.scrollLocation)
        });
    };
    
    function isInPosition(id, location, zoom){
        
        // get element and element's property 'top'
        var mBody = document.getElementById(id);
        var rect = mBody.getBoundingClientRect();
        y = rect.top;
    
        // set the top margin as a ratio of innerHeight
        var topMargin = window.innerHeight / 2;
    
        // call flyTo when top of element is halfway up innerHeight
        if ((y-topMargin) < 0 && y > 0){
            map.flyTo(location, zoom, {
                animate: true,
                duration: 2 // in seconds
            });
        };
    };

// function to trigger image switch on scroll
//caught TypeError: Cannot read properties of null (reading 'getBoundingClientRect') at isInPosition (main.js:179:26) at main.js:270:9 at Array.forEach (<anonymous>) at HTMLDocument.scroll (main.js:269:9)
/*function mapScroll(){
    fly.forEach(function(item){
        isInPosition(item.id)
    });
};
 //console log not working- error here   
function mapIsInPosition(id){   
    // get element and element's property 'top'
    var mBody = document.getElementById(id);
    var rect = mBody.getBoundingClientRect();
    console.log("sup")
    y = rect.top;

    // set the top margin as a ratio of innerHeight
    var topMargin = window.innerHeight / 2;

    // change image when top of element is halfway up innerHeight
    if ((y-topMargin) < 0 && y > 0){
        document.querySelector("map").id
    };
};
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


// function to trigger flyTo on scroll
function scroll(){
    fly.forEach(function(item){
        isInPosition(item.id, item.location, item.zoom)
    });
};
*/
createMap();

//document.addEventListener('scroll', scroll)
//document.addEventListener('scroll', mapScroll)
