Parse.initialize("RE4tpxAW81COn2tVEOHEWgEsW67JK4XZfUjiwUmY", "FN8xD0hlnhYAxpJ866FAbdY0t7JAKOy1Icp2TSeW");
var Runner = Parse.Object.extend("Runner");		
var me;

getYourself();

function getRunnerHandler(testObject)
{
	me = testObject;
						
	// The object was retrieved successfully.
	onParseSuccess('Object name: ' + me.get("nick"));
				
	SetParsPos();
}
function getYourself()
{
	getRunner(getRunnerHandler, 'dTUoUKLPTS');
}
function SetParsPos()
{
	alert("SetPos");
	getPos(function(position)
	{
		 map.setCenter(pos);
		alert("getCurrentPosition");
		me.set("curPos",new Parse.GeoPoint(position.coords.latitude, position.coords.longitude));
		alert("curPos");
		saveRunner(me);
	});
}

function saveRunner(runnerObj)
{
	runnerObj.save(null,
	{
		success: function(runnerObj)
		{
			onParseSuccess('New object created with objectId: ' + runnerObj.id);
		},
		error: onParseError
	});        
}
			
function getRunner(successCallback, objId)
{
	var query = new Parse.Query(Runner);
		query.get(objId,
		{
			success: successCallback,
			error: onParseError
		});
}
			
function onParseError(aObj, error)
{
	// The save failed.
	// error is a Parse.Error with an error code and message.
	alert('Failed to create new object, with error code: ' + error.message);
}
			
function onParseSuccess(str)
{
	// The save failed.
	// error is a Parse.Error with an error code and message.
	alert("yay! it worked" + str);
	//document.getElementById("conl").innerHTML = str;
}