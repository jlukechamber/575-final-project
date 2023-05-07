//initilize map and set center of map with coordinates
var map2;

function createmap() {

    map2 = L.map('map2', {
        center: [36.1755150, -152.4691482],
        zoom: 8,
        scrollWheelZoom: false,
        minZoom: 8,
        maxZoom: 15
    });

    //add the openstreet map tilelayer
    var OpenStreetMap_Mapnik = L.tileLayer('https://api.mapbox.com/styles/v1/randimaes/clhdjdvpd024j01qm1j8u7ckt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmFuZGltYWVzIiwiYSI6ImNsYTJveDBuMzBqOTkzcG1oZ3dyNXE5ZjEifQ.KopBuoAxGQO2d1NO_sNSOA', {
        maxZoom: 19,
        //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        accessToken: 'pk.eyJ1IjoicmFuZGltYWVzIiwiYSI6ImNsYTJveDBuMzBqOTkzcG1oZ3dyNXE5ZjEifQ.KopBuoAxGQO2d1NO_sNSOA'
    }).addTo(map2);

    getData();
};

function getData() {
    //load the data--> geojson file can be switched out for mapand.geojson
    fetch("data/region_polygons.geojson")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var layer = L.geoJson(json, {
                onEachFeature:onEachFeature
            }).addTo(map2)
        })
};

// L.geoJSON('data/region_polygons.geojson', {
//     style: function(properties) {
//         return {
//             fillColor: '#e2e4f6',
//             fillOpacity: '0.8',
//             weight: 2,
//             color: '#000'
//         };
//     }.addTo(map2)
// });


function onEachFeature(feature, layer) {
    //bind hover
    layer.bindTooltip(layer.feature.properties.region,{
        className:"custom-tooltip"
        //I think in this section we need to add the info within the popup
        //no
    })

    layer.on('mouseover', function(e) {
        e.target.setStyle({
            fillOpacity: 0.8,
        });
    });
    //currently I just change the fillopactity to match the background but the highlight leaves a snail trail
    layer.on('mouseout', function(e) {
        e.target.setStyle({
            fillOpacity: 0.16,
            fillColor:'#e2e4f6' 
            
        });
    });
};

//THIS CREATES LABELS FOR MAP2 --> map2 is not the correct variable to call but I am not sure what the correct variable/function to call is
L.geoJson(map2, {
    onEachFeature: function(feature, layer) {
      var label = L.marker(layer.getBounds().getCenter(), {
        icon: L.divIcon({
          className: "label",
          html: layer.feature.properties.continent,
          iconSize: [100, 40]
        })
      }).addTo(map);
    }
});


document.addEventListener('DOMContentLoaded', createmap)

mapboxgl.accessToken = 'pk.eyJ1IjoicmFuZGltYWVzIiwiYSI6ImNsYTJveDBuMzBqOTkzcG1oZ3dyNXE5ZjEifQ.KopBuoAxGQO2d1NO_sNSOA';
var bounds = [
    [-156.184, 35.075],
    [-150.72115, 37.78104],

  ];
//create the map
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/randimaes/clh418hoa019301p477eg0jbm',
    center: [-152.63623, 35.979111],
    zoom: 14,
    pitch: 0,
    maxBounds: bounds
    //lessen the pitch but increase the zoom 
});

//this code is for manually adding layers to the mapbox map

// Wait until the map has finished loading.
/*map.on('load', () => {
    //add labels
    map.addSource('labels_out', {
        'type': 'line',
        'url': 'mapbox://randimaes.clh7u928h1kon2onav58rlb79',
    });
    map.addLayer({
        'id': 'labels_out',
        'source': 'labels_out',
        'type': 'line',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            },
    });
    
    map.addSource('labels_cont', {
        'type': 'line',
        'url': 'mapbox://randimaes.clh7nsyu32f722bqjpfjoa1ft',
    });
    map.addLayer({
        'id': 'labels_cont',
        'source': 'labels_cont',
        'type': 'line',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            },
    },'labels_out');    


    //add continents   
    map.addSource('continents', {
        'type': 'fill',
        'url': 'mapbox://randimaes.clh84t5dr0ifv2apth4kpger0-5wd92',
    });
    map.addLayer({
        'id': 'continents',
        'source': 'continents',
        'type': 'fill',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            },
    },'labels_cont');   

    //add raster layers (x8 - spectrum, body, brain, mind, heart, soul, left brain, right brain)
    map.addSource('spectrum', {
        'type': 'raster',
        'url': 'mapbox://randimaes.30bu39ip',
    });
    map.addLayer({
        'id': 'spectrum',
        'source': 'spectrum',
        'type': 'raster',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            },
    },'continents');

    map.addSource('body', {
        'type': 'raster',
        'url': 'mapbox://randimaes.5itdo644',
    });
    map.addLayer({
        'id': 'body',
        'source': 'body',
        'type': 'raster',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'none'
            },
    },'continents');

    map.addSource('brain', {
        'type': 'raster',
        'url': 'mapbox://randimaes.0h1slq9h',
    });
    map.addLayer({
        'id': 'brain',
        'source': 'brain',
        'type': 'raster',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'none'
            },
    },'continents');

    map.addSource('mind', {
        'type': 'raster',
        'url': 'mapbox://randimaes.8f4h6lqq',
    });
    map.addLayer({
        'id': 'mind',
        'source': 'mind',
        'type': 'raster',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'none'
            },
    },'continents');

    map.addSource('heart', {
        'type': 'raster',
        'url': 'mapbox://randimaes.8kq924ep',
    });
    map.addLayer({
        'id': 'heart',
        'source': 'heart',
        'type': 'raster',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'none'
            },
    },'continents');
    
    map.addSource('soul', {
        'type': 'raster',
        'url': 'mapbox://randimaes.8onuks7u',
    });
    map.addLayer({
        'id': 'soul',
        'source': 'soul',
        'type': 'raster',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'none'
            },
    },'continents');

    map.addSource('leftbrain', {
        'type': 'raster',
        'url': 'mapbox://randimaes.6bie16kd',
    });
    map.addLayer({
        'id': 'leftbrain',
        'source': 'leftbrain',
        'type': 'raster',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'none'
            },
    },'continents');

    map.addSource('rightbrain', {
        'type': 'raster',
        'url': 'mapbox://randimaes.2ane6eqv',
    });
    map.addLayer({
        'id': 'rightbrain',
        'source': 'rightbrain',
        'type': 'raster',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            }
    },'continents');


});
*/

const chapters = {
    'blankintro': {
        center: [-152.63623, 35.979111],
        zoom: 14,
        pitch: 0,
        bearing: 0,
        duration:5000,
        speed:0.5

    },
    'intro2': {
        center: [-152.799, 35.957],
        zoom: 6.5,
        pitch: 50,
        bearing: 0,
        duration: 3000,
        speed:0.5

    },
    
    'mbody': {
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
        bearing: 0,
        center: [-153.3573469, 35.5006736],
        zoom: 8,
        pitch: 0,
        duration: 2000
    },
    'objectivity': {
        bearing: 0,
        center: [-152.5100277, 35.6125384],
        zoom: 8,
        pitch: 0,
        duration: 2000

    },
    'body': {
        bearing: 28,
        center: [-154.169, 35.226],
        zoom: 8,
        pitch: 64,
        duration:3000
    },
    'brain': {
        bearing: 7.2,
        center: [-153.5, 34],
        zoom: 8,
        pitch: 61,
        duration:3000
    },
    'mind': {
        bearing: 0,
        center: [-152.464, 34],
        zoom: 7.75,
        pitch: 60,
        duration: 3000
    },
    'heart': {
        bearing: -11.2,
        center: [-151.6866, 34.6394],
        zoom: 8,
        pitch: 65,
        duration: 3000
    },
    'soul': {
        bearing: -24,
        center: [-150.86, 34.9],
        zoom: 8.5,
        pitch: 66,
        duration: 3000
    },
    'right_brain': {
        bearing: -20,
        center: [-151.693, 35.592],
        zoom: 6.57,
        pitch: 45,
        duration: 3000
    },
    'left_brain': {
        bearing: 20,
        center: [-153.458, 35.804],
        zoom: 6.57,
        pitch: 45,
        duration: 3000
    },
    'everything': {
        bearing: 88,
        center: [-156.184, 35.075],
        pitch: 62,
        zoom: 8.3,
        duration: 5000
    },
    'nothing': {
        bearing: -76,
        center: [-148.72115, 34.78104],
        pitch: 60,
        zoom: 12,
        duration: 10000
    }
};

//THIS CREATES LABELS FOR MAP2 --> map2 is not the correct variable to call but I am not sure what the correct variable/function to call is
/*L.geoJson(map2, {
    onEachFeature: function(features, layer) {
      var label = L.marker(layer.getBounds().getCenter(), {
        icon: L.divIcon({
          className: "label",
          html: layer.feature.properties.continent,
          iconSize: [100, 40]
        })
      }).addTo(map2);
    }
});
*/

//L.geoJSON(features)

let activeChapterName = 'blankintro';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).classList.add('active');
    document.getElementById(activeChapterName).classList.remove('active');

    //code to toggle visibility
    /*if (chapterName.id){
        map.setLayoutProperty(chapterName.id,"visibility","visible")
    }*/

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

// On every scroll event, check which element is on screen
window.onscroll = () => {
    for (const chapterName in chapters) {
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }

}
