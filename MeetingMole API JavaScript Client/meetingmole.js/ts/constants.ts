"use strict";
/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js 
*/
module MeetingMole.SDK.Constants
{
	/**
	 * API Base URL
	 */
	export var BaseURL: string = "/publicapi/v1/";

	/**
	 * Access API action URLs
	 */
	export var AccessAPIURLs = {
		SimpleLogin: "access/simplelogin",
		About: "access/about",
		CheckToken: "access/checktoken",
		Logout: "access/logout"
	};

	/**
	 * Teams API action URLs
	 */
	export var TeamsAPIURLs = {
		GetAll: "teams/getall"
	};

	/**
	 * Widget API action URLs
	 */
	export var WidgetsAPIURLs = {
		CaptureSubmit: "widgets/capturesubmit"
	};

	/**
	 * Unified error codes across the sdk.
	 * System errors range: 0-99.
	 * Widget errors range: 100-199.
	 * 
	 */
	export enum ErrorCodes
	{
		/**
		 * Unknown error.
		 */
		UnknownError = 0,
		/**
		 * Http protocol error or server exception.
		 */
		HttpError = 1,
		/**
		 * The request succeeded, but the server returned an empty response.
		 */
		EmptyResponse = 2,
		/**
		 * A logical error occurred on the server, which prevented the action from being executed.
		 */
		ServerRejected = 3,

		WidgetError_EmailAddressInvalid = 100,
	}
}
