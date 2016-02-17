"use strict";
/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js 
*/
module MeetingMole.Constants
{
	/**
	 * API Base URL
	 */
	export var BaseURL: string = "/publicapi/v1/";
	/**
	 * API action URLs
	 */
	export var APIURLs = {
		SimpleLogin: "access/simplelogin",
		About: "access/about",
		CheckToken: "access/simplelogin",
		Logout: "access/logout"
	};
}
