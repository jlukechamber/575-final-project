//// array containing locations
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
var minValue;
var dataStats = {};

//step 1 create map
function createMap() {

    //create the map (L. is leaflet)
    map = L.map('mapid', {
        center: [20.614399, 70.926953],
        zoom: 1,
        //set zoom level constraints
        //THIS WILL NEED TO CHANGE
        minZoom: 2,
        maxZoom: 5
        //add panning constraints
        // set panning constraint

    });

//     //add OSM base tilelayer
//     L.tileLayer('https://api.mapbox.com/styles/v1/randimaes/cleq9kh7c000q01lmxdwexoou/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmFuZGltYWVzIiwiYSI6ImNsYTJveDBuMzBqOTkzcG1oZ3dyNXE5ZjEifQ.KopBuoAxGQO2d1NO_sNSOA', {
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
//     }).addTo(map);

//     //call getData function
//     getData();
 };


// Import GeoJSON data
function getData() {
    //load the data
    fetch("data/mind_continents.geojson")
        .then(function (response) {
            return response.json();
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

(function(){
    //calculate inline position of a right element 
    function rightPosition(){
        document.querySelectorAll('.right').forEach(div =>{
            var children = div.parentNode.childNodes,
                containsLeft;

            //calculate if positioned next to a .left element
            for (child of children){
                if(child.classList){
                    containsLeft = child.classList.contains("left");
                    if (containsLeft){
                        div.classList.remove('right')
                        div.classList.add('right-inline')
                        break;
                    }
                }
            }
        });

        //full width element
        document.querySelectorAll('.full-width').forEach(div =>{
            div.parentNode.style.padding = 0;
        });
    }
    //center title horizontally and vertically within page
    function positionTitle(){
        if (document.querySelector('.title')){
            var children = document.querySelector('.title').childNodes,
                tHeight = document.querySelector('.title').clientHeight,
                cHeight = 0;

            for (child of children){
                if (child.clientHeight)
                    cHeight += child.clientHeight;
            }

            document.querySelector('.title').firstElementChild.style.marginTop = (tHeight - cHeight)/2 + "px";
        }
    }
    //center element vertically within the page
    function vertCenter(){
        document.querySelectorAll('.vert-center').forEach(div =>{
            var height = div.clientHeight,
                pHeight = div.parentNode.clientHeight;
                
            div.style.marginTop = (pHeight/2) - (height/2) + "px";
        });
    }
    //resize background elements
    function resizeBackround(){
        var width = document.documentElement.clientWidth;

        document.querySelectorAll('.container').forEach(div =>{
            div.width = width + 'px !important';
        });
    }
    //function for a smooth transition between background elements
    function backgroundTransition(){
        document.querySelectorAll(".scroll-container").forEach(function(scrollContainer){
            let foreground = scrollContainer.children[1],
                background = scrollContainer.children[0],
                foregroundItems = [];
            //add individual foreground items to the array
            foreground.childNodes.forEach(function(child){
                if (child.nodeName == "DIV"){
                    foregroundItems.push(child);
                }
            })
            //if there is more than one background item, activate scroll listener
            if(background.children.length > 1){
                background.childNodes.forEach(function(child){
                    //if the element is not a "text" element
                    if (child.nodeName != "#text" && child.nodeName != "#comment"){
                        //retrieve data-slide value to get the foreground item
                        console.log(child)
                        let id = child.dataset.slide ? child.dataset.slide : 0;
                        //activate listener for each background item
                        document.addEventListener("scroll",function(){
                            //position at the bottom of the screen
                            let scrollPos = window.scrollY + (window.innerHeight) - foregroundItems[id].clientHeight,
                            //position of the select foreground item
                                foreGroundOffset = foregroundItems[id].offsetParent.offsetTop + foregroundItems[id].offsetTop;
                            //if the current scroll position is greater than the bottom position of the foreground element
                            if (scrollPos > foreGroundOffset){
                                if (child.previousElementSibling)
                                    child.previousElementSibling.classList.add("hidden");
                                if (child.nextElementSibling)
                                    child.nextElementSibling.classList.add("hidden");
                                child.classList.remove("hidden");
                                vertCenter();
                            }  
                        })
                    }
                })
            }
        })
    }
    //functions to fire on resize
    function resize(){
        rightPosition();
        vertCenter();
        positionTitle();
        resizeBackround();
        backgroundTransition();
    }

    document.addEventListener('DOMContentLoaded', resize);
    document.addEventListener('scroll', vertCenter);
    window.addEventListener('resize', resize);

})();