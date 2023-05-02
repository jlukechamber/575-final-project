// explorable final map
//var finalMap;

 // not entirely sure if I am adding this correctly because we are not using a geojson 
    //function getData() {
        //I know there are issues here but not sure what. I think it has to do with the brackets and parentheses between the function and the array
        var finalMap = {

            'body': {
                bearing: 27,
                center: [-154.1422696, 35.7988407],
                zoom: 8,
                pitch: 0,
                duration: 4000
            },
            'conciousness': {
                duration: 2000,
                center: [-153.4242405, 36.1905128],
                zoom: 8,
                pitch: 0,
                bearing: -15
            },
            'subjectivity': {
                bearing: -10,
                center: [-152.6586802, 36.7255401],
                zoom: 8,
                speed: 0.6,
                pitch: 0,
                duration: 3000
            },
            'ego': {
                bearing: 0,
                center: [-151.6775737, 36.4988286],
                zoom: 8,
                duration: 3000,
                pitch: 0
            },
            'antiego': {
                bearing: 0,
                center: [-151.1275595, 35.9832893],
                zoom: 8,
                pitch: 0,
                duration: 3000
            },
            'other': {
                bearing: 25,
                center: [-151.1461410, 35.4613327],
                zoom: 8,
                duration: 3000,
                pitch: 0
            },
            'will': {
                bearing: 0,
                center: [-151.5809496, 35.7875796],
                zoom: 8,
                pitch: 0,
                duration: 2000
            },
            'freedom': {
                bearing: 0,
                center: [-152.4691482, 36.1755150],
                zoom: 8,
                pitch: 0,
                duration: 3000
            },

            'unconsciousness': {
                bearing: 90,
                center: [-153.3573469, 35.5006736],
                zoom: 8,
                pitch: 20
            },
            'objectivity': {
                bearing: 90,
                center: [-152.5100277, 35.6125384],
                zoom: 8,
                pitch: 20
            }
        };
   // };

//generate the final map
function createFinalMap() {
    //create the map
    finalMap = L.map('finalMap', {
        //map parameters
        center: [-152.4691482, 36.1755150],
        zoom: 5,
        maxZoom: 12,
        minZoom: 5,
        scrollWheelZoom: false,
        //needed to get rid zoom in order to move it 
        zoomControl: false,
    });

    // add zoom with home button
    var zoomHome = L.Control.zoomHome({ position: 'bottomright' });
    zoomHome.addTo(finalMap);

    //adding basemap??
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFuZGltYWVzIiwiYSI6ImNsYTJveDBuMzBqOTkzcG1oZ3dyNXE5ZjEifQ.KopBuoAxGQO2d1NO_sNSOA';
    var finalMap = new mapboxgl.finalMap({
        container: 'finalMap',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/randimaes/clh418hoa019301p477eg0jbm',
        center: [-152.4691482, 36.1755150],
        zoom: 5,
        pitch: 80
        //lessen the pitch but increase the zoom 
    });

    //add the basemap.
    /* L.tileLayer('https://api.mapbox.com/styles/v1/ajnovak/cl2grbrgj003o14mot9tnmwh1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWpub3ZhayIsImEiOiJja2dnMWJoYXkwd3hlMnlsN241MHU3aTdyIn0.YlwTqHjnT8sUrhr8vtkWjg', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
         subdomains: 'abcd',
     }).addTo(finalMap);*/

    //call getData function
    finalMap();
};

















document.addEventListener('DOMContentLoaded', createFinalMap)