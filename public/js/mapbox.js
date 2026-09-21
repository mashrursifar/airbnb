// let mapToken = mapToken;
console.log("Map token: ",mapToken);
const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12", // Use the standard style for the map
    projection: "globe", // display the map as a globe
    zoom: 9, // initial zoom level, 0 is the world view, higher values zoom in
    center: [90.4125, 23.8103], // center the map on this longitude and latitude
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

map.on("style.load", () => {
    map.setFog({}); // Set the default atmosphere style
});
