/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
// console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYnJ5Y2UyOSIsImEiOiJja3p4cnA4NTIwNGY1MnZwNzJteGd3cWdrIn0.JLvwrEqRYTJ5gH86YUysPw';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/bryce29/ckzxsfw48004814mimmav90v3', // style URL
  scrollZoom: false,
  // center: [-118.113491, 34.111745], // starting position [lng, lat]
  // zoom: 9, // starting zoom
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
