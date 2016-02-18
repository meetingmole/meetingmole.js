"use strict";
/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js 
*/
module MeetingMole.SDK.Models
{
	/**
	 * API Error object.
	 */
	export interface IErrorModel
	{
		/**
		 * Http Error code if any.
		 */
		HttpErrorCode: number;
		/**
		 * Short error message. Error messages are always in English, unless triggered by the local browser without server interaction.
		 */
		Error: string;
		/**
		 * Error details, if any.
		 */
		ErrorDetails: string;
		/**
		 * Client library error code.
		 */
		ClientErrorCode:Constants.ErrorCodes;
		/**
		 * Client library error constant.
		 */
		ClientErrorConstant: string;
	}

	/**
	 * About / ping result model.
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
	 * Version info.
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
	 * Authentication (verification) package. To resume an interrupted API session without username/password login, all of these parameters must be passed.
	 */
	export interface IAuthenticationModel
	{
		/**
		 * User login, username or email address.
		 */
		Username: string;
		/**
		 * Current API access token.
		 */
		AccessToken: string;
		/**
		 * Current client secret. Client secret is defined by you and is used to encrypt the tokens so that they cannot be manipulated on the server.
		 * It can also be considered to be a "local session token".
		 */
		ClientSecret: string;
	}

	/**
	 * MeetingMole Team
	 */
	export interface ITeam
	{
		/**
		 * ID of the team.
		 */
		ID: number;
		/**
		 * Name of the team.
		 */
		TeamName: string;
	}

	/**
	 * Capture widget initialization parameters.
	 */
	export interface ICaptureWidgetParameters
	{
		/**
		 * Optional. ID of the email field to wire the widget to. If not defined, you must supply the email via other means (as in OnSubmit event).
		 */
		EmailFieldID?: string;
		/**
		 * Mandatory. ID of the button to wire the widget to.
		 */
		ButtonID: string;
		/**
		 * Mandatory. ID of the team the widget belongs to.
		 */
		TeamID: number;
		/**
		 * Mandatory. ID of the widget definition on the server.
		 */
		WidgetID: string;
		/**
		 * Mandatory. API Key to use for authentication and origin validation.
		 */
		API_KEY: string;
		/**
		 * Optional. Triggers just before the request is sent to the server.
		 * If no email field is specified, must return the email address to add to the campaign. Otherwise should return null.
		 */
		OnSubmit?: () => string;
		/**
		 * Optional. Triggers if an error occurs.
		 * @param {IErrorModel} oError - Error object.
		 */
		OnError?: (oError: IErrorModel) => void;
		/**
		 * Optional. Triggers upon success.
		 */
		OnSuccess?: () => void;
		/**
		 * Optional. Triggers upon completion (whether error or success, triggered last)
		 * @param {boolean} bSuccess - True if the request was successful.
		 */
		OnComplete?: (bSuccess: boolean) => void;
	}
}
