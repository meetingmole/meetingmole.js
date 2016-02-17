# meetingmole.js
##JavaScript Client for MeetingMole API 

This is a JavaScript client library for accessing the MeetingMole Public API. The use of the library requires a valid Team account at MeetingMole server. You can use with individual authentication (username/password), or an API key. For details of available plans, see [http://meetingmole.com](http://meetingmole.com).

###Install: 
```
bower install meetingmole.js --save
```
Or use the file *"meetingmole.js"* under the "/package" directory in this repo.


###Configure:
Log in to your MeetingMole account and enter the Team Admin. Under Team Settings / API Keys, enable API access and generate the required API Keys.


###Use with JavaScript:
```javascript
// Create client
var oClient = new MeetingMole.SDK.JSClient( "https://meetingmole.com" );
// Login (individual auth)
oClient.Login("test@test.test", "test", function(){ 
	// Logged in
	oClient.GetItems(...);
	...
}, function( oError ){
	// Fail
});
```

###Use with TypeScript:
The definitions can be found under "/package/ts/meetingmole.d.ts". 
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

___

Copyright (c) 2015-2016 MeetingMole GmbH. All Rights Reserved. [http://meetingmole.com](http://meetingmole.com)
