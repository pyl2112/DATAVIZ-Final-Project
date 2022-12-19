mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bGVkd2FyZGxpdSIsImEiOiJjbGFsdG84eDQwNTcwM3BzMGZtN2NncGc2In0.a-9j38sjZ39f4eNpr3vzaw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/pauledwardliu/clb3axdko000p14k1wtchmw2x', // style URL
center: [-73.98, 40.8], // starting position [lng, lat]
zoom: 11, // starting zoom

});
// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});

map.on("load",function(){
	console.log(map.getStyle().layers)
map.on('mousemove', 'data-driven-circles', (e) => {
		map.getCanvas().style.cursor = 'pointer';

		//below logs out all the possible properties
		console.log(e.features[0].properties.Insidevoutside)
		const coordinates = e.features[0].geometry.coordinates.slice();
		//I just chose the first one which is address
		const description = e.features[0].properties["room_function"];
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
		coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}
		popup.setLngLat(coordinates).setHTML(description).addTo(map);
})
});
