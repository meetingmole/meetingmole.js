# meetingmole.js
##JavaScript Client for MeetingMole API 

This is a JavaScript client library for accessing the MeetingMole Public API. The use of the library requires a valid Team license at a MeetingMole server. You can connect to the API using individual authentication (username/password), or an API key. For details of available plans, see [http://meetingmole.com](http://meetingmole.com).

###Install: 
```
bower install meetingmole.js --save
```
Or just copy the file *"/package/min/meetingmole.js"* in this repo to your project.


###Configure:
Log in to your MeetingMole account and enter the Team Admin. Under Team Settings / API Keys, enable API access and generate the required API Keys.


###Use:
```html
<html>
<head>
	<script src="meetingmole.js"></script>
</head>
<body>
<script type="text/javascript">
	// Create client
	var oClient = new MeetingMole.SDK.JSClient( "https://meetingmole.com" );
	// Login (individual auth)
	oClient.Login("test@test.test", "test", function() { 
		// Logged in
		oClient.GetItems(...);
		...
	}, function( oError ) {
		// Fail
	});
</script>
</body>
</html>
```

###Use with TypeScript:
The type definitions can be found in this repo under *"/package/ts/meetingmole.d.ts"*. 
```typescript
var oClient : MeetingMole.SDK.JSClient = new MeetingMole.SDK.JSClient( "https://meetingmole.com" );
// Login (individual auth)
oClient.Login("test@test.test", "test", ()=>{ 
	// Logged in
	oClient.GetItems(...);
	...
}, ( oError )=>{
	// Fail
});
```

###Docs:
+ MeetingMole Public API Overview: [https://meetingmole.com/resources/apidocs](https://meetingmole.com/resources/apidocs)
+ MeetingMole Public API Reference: [http://meetingmole.com/swagger](http://meetingmole.com/swagger)
+ MeetingMole API JavaScript Client Reference: [http://meetingmole.com](http://meetingmole.com)

###Change log:
####1.0.x - in development
+ Initial functional public release.

####1.0.0-1.0.2
+ Test packaging and framework releases. Partially or completely NON-FUNCTIONAL.

___

Copyright (c) 2015-2016 MeetingMole GmbH. All Rights Reserved. [http://meetingmole.com](http://meetingmole.com)
