var map;
var runers = [];
var targets = [];
var meMarker;
var msCounter = 0;

function mapInit()
{
	var mapOptions = { zoom: 6 };
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	getPos(function(position)
	{
		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		map.setCenter(pos);
		meMarker = placeRuner(pos, map, "ME");
	});
	//map.setCenter(-25.363882,131.044922);
	google.maps.event.addListener(map, 'click', function(e)
	{
		//var name = prompt("Please, enter name:");
		var mesage = prompt("Please, enter message:");
		if(mesage)
		{
			//placeMarker(e.latLng, map, mesage);
			
			createTarget(me.get('nick') + "_CP_" + msCounter++, e.latLng.lat(), e.latLng.lng(), mesage);
		}
		setTimeout(updateMap, 1000);
	});	
	getYourself();
	setInterval(updateMap, 30000);
}
function updateMap()
{
	/*if(meMarker)
		meMarker.setMap(null);
	meMarker = getPos(function(position)
	{
		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		placeMarker(pos, map, "ME");
	})*/
	getYourself();
	//();
}
function getRunnersHandler(results)
{
    for (var i = 0; i < results.length; i++)
	{ 
        var object = results[i];
        
		var pos = new google.maps.LatLng(object.get('curPos').latitude, object.get('curPos').longitude);
		
		if(runers[object.id])
			runers[object.id].setPosition(pos);
		else
			runers[object.id] = placeRuner(pos, map, object.get('nick'));
		
		//onParseSuccess(object.id + ' - ' + object.get('nick'));
	}
}
function getTargetsHandler(results)
{
	var object;
	for (var i = 0; i < results.length; i++)
	{ 
		object = results[i];
		
		var pos = new google.maps.LatLng(object.get('pos').latitude, object.get('pos').longitude);
		if(targets[object.id])
			targets[object.id].setPosition(pos);
		else
			targets[object.id] = placeTarget(pos, map, object.get('trgName'), object.get('state'));
		//onParseSuccess(object.id + ' - ' + object.get('trgName') + ' - ' + object.get('state'));

	}
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
var iconBase =  'http://maps.google.com/mapfiles/';
var target_icons = [
    iconBase + 'marker_black.png',  iconBase + 'marker_green.png',    iconBase + 'marker_orange.png',  iconBase + 'marker.png'
];

function placeTarget(position, map, mesage, status)
{
	//alert(mesage);//test
	var marker = new google.maps.Marker({
	position: position,
	map: map,
	title: mesage,
	icon: target_icons[status]
	});
	map.panTo(position);
	return marker;
}
function placeRuner(position, map, mesage)
{
	//alert(mesage);//test
	var marker = new google.maps.Marker({
	position: position,
	map: map,
	title: mesage,
	});
	map.panTo(position);
	return marker;
}

