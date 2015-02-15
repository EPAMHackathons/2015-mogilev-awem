var map;
var markers = [];
var meMarker;
google.maps.event.addDomListener(window, 'load', mapInit);
function mapInit()
{
	alert("mapObjectInit");
	var mapOptions = { zoom: 6 };
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	getPos(function(position)
	{
		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		map.setCenter(pos);
		meMarker = placeMarker(pos, map, "ME");
	});
	
	google.maps.event.addListener(map, 'click', function(e)
	{
		var mesage = prompt("Please, enter mesage:");
		if(mesage)
			placeMarker(e.latLng, map, mesage);
	});	
	setInterval(timer, 1000);
}
function timer()
{
	if(meMarker)
		meMarker.setMap(null);
	meMarker = getPos(function(position)
	{
		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		//map.setCenter(pos);
		placeMarker(pos, map, "ME");
	});
}
function getPos(successCallback)
{
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(
		successCallback,
		function()
		{
			handleNoGeolocation(true);
		},
		{
			enableHighAccuracy: true,
			timeout: 60000,
			maximumAge: 0
		});
	}
	else
	{
		handleNoGeolocation(false);
	}
}
function getYourself()
{
	getRunner(getRunnerHandler, 'dTUoUKLPTS');
}
			
function handleNoGeolocation(errorFlag)
{
	if (errorFlag)
	{
		var content = 'Error: The Geolocation service failed.';
	}
	else
	{
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}
	alert(content);
}
function placeMarker(position, map, mesage)
{
	//alert(mesage);//test
	var marker = new google.maps.Marker({
	position: position,
	map: map,
	cursor: mesage
	});
	map.panTo(position);
	return marker;
}

