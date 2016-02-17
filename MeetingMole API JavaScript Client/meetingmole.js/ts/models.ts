"use strict";
/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js 
*/
module MeetingMole.Models
{
	/**
	 * API Error
	 */
	export interface IErrorModel
	{
		HttpErrorCode: number;
		Error: string;
		ErrorDetails: string;
	}

	/**
	 * About / ping result model
	 */
	export interface IAboutModel
	{
		/**
		 * Version of the API connected to.
		 */
		Version: string;

		/**
		 * Type of the API connected to.
		 */
		APIType: string;

		/**
		 * Description of the API.
		 */
		APIDescription: string;

		/**
		 * Time on server at the time of request.
		 */
		ServerTime: Date;
	}

	/**
	 * Version info
	 */
	export interface IVersionInfo
	{
		/**
		 * Version of the client SDK
		 */
		ClientVersion: string;
		/**
		 * Version of the server API
		 */
		APIVersion: string;
		/**
		 * Version of the server web app
		 */
		WebAppVersion: string;
		/**
		 * Version of the server core
		 */
		CoreVersion: string;
	}

	/**
	 * Authentication (verification) package
	 */
	export interface IAuthenticationModel
	{
		Username: string;
		AccessToken: string;
		ClientSecret: string;
	}

	/**
	 * MeetingMole Team
	 */
	export interface ITeam
	{

	}
}
