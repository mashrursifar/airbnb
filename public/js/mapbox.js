// let mapToken = mapToken;
console.log("Map token: ",listing);
const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12", // Use the standard style for the map
    projection: "globe", // display the map as a globe
    zoom: 9, // initial zoom level, 0 is the world view, higher values zoom in
    center: listing.geometry.coordinates, // center the map on this longitude and latitude
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

map.on("style.load", () => {
    map.setFog({}); // Set the default atmosphere style
});

const marker = new mapboxgl.Marker({
    color: '#00f00', // set marker color
    scale: .7        // scale the marker size
  })
  .setLngLat(listing.geometry.coordinates)
  .addTo(map);

  const popup = new mapboxgl.Popup()
  .setHTML('<p>Exact location will be provide after booking</p>');

marker.setPopup(popup);