// Replace YOUR_ACCESS_TOKEN with your own Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoicmFuZGltYWVzIiwiYSI6ImNsYTJveDBuMzBqOTkzcG1oZ3dyNXE5ZjEifQ.KopBuoAxGQO2d1NO_sNSOA';

// Initialize the map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/randimaes/clh418hoa019301p477eg0jbm',
  center: [-122.4194, 37.7749],
  zoom: 12
});

// Add a marker at the location you want to scroll to
var marker = new mapboxgl.Marker()
  .setLngLat([-122.4194, 37.7749])
  .addTo(map);

// Add an event listener to the text that will trigger the map to scroll
document.getElementById('text').addEventListener('scroll', function() {
  map.flyTo({
    center: [-122.4194, 37.7749],
    zoom: 16,
    speed: 1,
    curve: 1,
    easing: function (t) {
      return t;
    }
  });
});
