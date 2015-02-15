var map;
var markers = [];
var meMarker;
google.maps.event.addDomListener(window, 'load', mapInit);
function mapInit()
{
	alert("mapObjectInit");
	var mapOptions = { zoom: 6 };
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	//getPos(function(position)
	//{
	//	var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	//	map.setCenter(pos);
	//	meMarker = placeMarker(pos, map, "ME");
	//});
	//map.setCenter(-25.363882,131.044922);
	google.maps.event.addListener(map, 'click', function(e)
	{
		var mesage = prompt("Please, enter mesage:");
		if(mesage)
			placeMarker(e.latLng, map, mesage);
	});	
	getYourself();
	//setInterval(timer, 1000);
}
function getRunnersHandler(results)
{
    for (var i = 0; i < results.length; i++)
	{ 
        var object = results[i];
        
		var pos = new google.maps.LatLng(object.get('curPos').latitude, object.get('curPos').longitude);
		
		if(markers[object.id])
			markers[object.id].setPlace(pos);
		else
			markers[object.id] = placeMarker(pos, map, object.get('nick'));
		
		//onParseSuccess(object.id + ' - ' + object.get('nick'));
	}
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

