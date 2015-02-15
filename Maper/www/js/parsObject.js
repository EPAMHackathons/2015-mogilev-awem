Parse.initialize("RE4tpxAW81COn2tVEOHEWgEsW67JK4XZfUjiwUmY", "FN8xD0hlnhYAxpJ866FAbdY0t7JAKOy1Icp2TSeW");
var Runner = Parse.Object.extend("Runner");
var Target =  Parse.Object.extend("Target");	
var me;

function getRunnerHandler(testObject)
{
	me = testObject;
						
	// The object was retrieved successfully.
	onParseSuccess('Object name: ' + me.get("nick"));
				
	SetParsPos();
}
//function getRunnersHandler(results)
//{
    
//}
function getYourself()
{
	getRunner(getRunnerHandler, "awem", nick);
	getRunners(getRunnersHandler, "awem", nick);
	getTargets(getTargetsHandler, "hack-Anton")
	
}
function SetParsPos()
{
	getPos(function(position)
	{
		//map.setCenter(pos);
		me.set("curPos",new Parse.GeoPoint(position.coords.latitude, position.coords.longitude));
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
			
function getRunner(successCallback, groupName, meNick)
{
	var query = new Parse.Query(Runner);
    query.equalTo("nick", meNick);
	query.equalTo("group", groupName)
	query.first(
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
	//alert("yay! it worked" + str);
	//document.getElementById("conl").innerHTML = str;
}
function getRunners(successCallback,groupName, meNick) {
    var queryMe = new Parse.Query(Runner);
    queryMe.equalTo("nick", meNick);

    var query = new Parse.Query(Runner);
    query.equalTo("group", groupName);
    query.doesNotMatchKeyInQuery("nick", "nick", queryMe);
    query.find({
    success: successCallback,
    error: onParseError
    });
}


function createTarget(name, x, y, comment) {
	var testObject = new Target();
	testObject.set("trgName", name);
	testObject.set("pos", new Parse.GeoPoint(x, y));
	testObject.set("comment", comment);
	testObject.set("state", TargetStateType.open);
	testObject.set("eventId", "hack-Anton");
	
	testObject.save(null);
}
function getTargets(successCallback, eventId) {
	var query = new Parse.Query(Target);
	query.equalTo("eventId", eventId);
	query.find({
	  success: successCallback,
	  error: onParseError
	});
}
function joinEvent(groupNamenick) {
	var query = new Parse.Query(Runner);
	 query.equalTo("group", "awem");
	 query.equalTo("nick", nick);
	 query.first(
	 {
	   success: function(runnerObj) {
		 //alert("Successfully retrieved " + runnerObj.id);
//             // Do something with the returned Parse.Object values
			if (runnerObj) {
				//onParseSuccess(runnerObj.id + ' - ' + runnerObj.get('curPos').latitude);
			} else {
				createRunner(nick, groupName);
			}
	   },
	   error: onParseError
	 }
	);
}