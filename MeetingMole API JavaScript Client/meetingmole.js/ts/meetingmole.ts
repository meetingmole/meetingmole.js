"use strict";
/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js 
*/
module MeetingMole
{
	/**
	 * MeetingMole API JavaScript Client
	 */
	export class JSClient
	{
		/**
		 * API Client version
		 */
		public Version(): string {
			return "1.0.2";
		}

		/**
		 * Current Server URL.
		 */
		public ServerURL(): string
		{
			return this.sServerURL;
		}
		private sServerURL: string = null;

		/**
		 * Username of the currently logged in user. Null if not logged in.
		 */
		public Username(): string
		{
			if(!this.bIsConnected) {
				return null;
			}
			return this.sUsername;
		}
		private sUsername: string = null;

		/**
		 * True if the client is connected and authenticated
		 */
		public IsConnected(): boolean {
			return this.bIsConnected;
		}
		private bIsConnected:boolean= false;

		/**
		 * Constructs a new JS Client
		 * @param {string} sServerURL - The URL of the server to connect to.
		 */
		public constructor(sServerURL: string)
		{
			if(!sServerURL) {
				throw "Parameter sServerURL must be defined.";
			}
			sServerURL = sServerURL.trim();
			if(sServerURL.indexOf("http://") !== 0
				&& sServerURL.indexOf("https://") !== 0
			) {
				throw "Parameter sServerURL must start with authority (http:// or https://).";
			}
			if(sServerURL[sServerURL.length - 1] === "/") {
				sServerURL = sServerURL.substring(0, sServerURL.length - 1);
			}
			this.sServerURL = sServerURL + Constants.BaseURL;
		}

		/**
		 * Disposes the client and releases all resources. Logs out if connected.
		 */
		public Dispose(): void
		{
			if(this.IsConnected()) {
				this.Logout(() => {}, () => {});
			}
			this.sServerURL = null;
		}

		/**
		 * Pings the server for a life sign.
		 * @param onSuccess - Triggered on success.
		 * @param onFailure - Triggered on failure.
		 */
		public Ping( onSuccess:(oResult:Models.IAboutModel)=>void,onFailure:(oError:Models.IErrorModel)=>void): void {
			$.ajax({
				url: this.sServerURL + Constants.APIURLs.About,
				method: "get",
				timeout: 30000,
				cache: false,
				success: (response, sStatusText, jqXHR) => {
					var oError = this.handleError(response);
					if(oError)
					{
						onFailure(oError);
						return;
					}
					onSuccess(response);
				},
				error: (response, sStatusText, error) => {
					var oError = this.handleProtocolError(response);					
					onFailure(oError);
				}
			});
		}

		/**
		 * Logs the user out
		 * @param onSuccess
		 * @param onFailure
		 */
		public Logout(onSuccess: (oResult: Models.IAboutModel) => void, onFailure: (oError: Models.IErrorModel) => void): void {
			if(!this.IsConnected()) {
				return;
			}
			$.ajax({
				url: Constants.BaseURL + Constants.APIURLs.Logout,
				method: "post",
				timeout: 30000,
				cache: false,
				success: (response) =>
				{
					var oError = this.handleError(response);
					if(oError)
					{
						onFailure(oError);
						return;
					}
					this.sUsername = null;
					this.bIsConnected = false;
					onSuccess(response);
				},
				error: (response) =>
				{
					var oError = this.handleProtocolError(response);
					onFailure(oError);
				}
			});
		}

		/**
		 * Logs the user in. Does nothing if already logged in.
		 * @param {string} sUsername
		 * @param {string} sPassword
		 * @param onSuccess
		 * @param onFailure
		 */
		public Login(sUsername:string,sPassword:string,onSuccess: (oResult: Models.IAboutModel) => void, onFailure: (oError: Models.IErrorModel) => void): void
		{
			if(this.IsConnected())
			{
				return;
			}
			$.ajax({
				url: Constants.BaseURL + Constants.APIURLs.Logout,
				method: "post",
				timeout: 30000,
				cache: false,
				success: (response, sStatusText, b) =>
				{
					//console.log(sStatusText);
					console.log(b);
					var oError = this.handleError(response);
					if(oError)
					{
						onFailure(oError);
						return;
					}
					this.sUsername = sUsername;
					this.bIsConnected = false;
					onSuccess(response);
				},
				error: (response, a, b) =>
				{
					console.log(a);
					console.log(b);
					var oError = this.handleProtocolError(response);
					onFailure(oError);
				}
			});
		}

		private handleError(response: any): Models.IErrorModel {
			if(!response)
			{
				// No response from server
				return {
					HttpErrorCode: 400,
					Error: "No response received from server",
					ErrorDetails: ""
				}
			}
			if(response.error)
			{
				// Managed server error
				return response.error;
			}
			// Not an error
			return null;
		}

		private handleProtocolError(response: JQueryXHR): Models.IErrorModel {
			if(!response)
			{
				return {
					HttpErrorCode: 400,
					Error: "Unknown error",
					ErrorDetails: ""
				}
			}
			// TODO:
			console.log(response);
			var iErrorCode=-1;
			var sError = "Unknown error";
			if (response.status > 0) {
				iErrorCode = response.status;
			}
			if(response.statusText )
			{
				sError = response.statusText;
			}
			return {
				HttpErrorCode: iErrorCode,
				Error: sError,
				ErrorDetails: "TODO:"
		};
		}
	}
}
