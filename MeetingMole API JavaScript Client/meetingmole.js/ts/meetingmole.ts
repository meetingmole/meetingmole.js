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
		private oAuthentication: Models.IAuthenticationModel = null;
		private dtTokenExpires: Date = null;

		/**
		 * API Client version
		 */
		public Version(): string
		{
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
			if(!this.bIsConnected || !this.oAuthentication)
			{
				return null;
			}
			return this.oAuthentication.Username;
		}

		/**
		 * True if the client is connected and authenticated
		 */
		public IsConnected(): boolean
		{
			return this.bIsConnected;
		}
		private bIsConnected: boolean = false;

		/**
		 * Constructs a new JS Client
		 * @constructor 
		 * @param {string} sServerURL - The URL of the server to connect to. Must start with http:// or https://.
		 */
		public constructor(sServerURL: string)
		{
			if(!sServerURL)
			{
				throw "Parameter sServerURL must be defined.";
			}
			sServerURL = sServerURL.trim();
			if(sServerURL.indexOf("http://") !== 0
				&& sServerURL.indexOf("https://") !== 0
			)
			{
				throw "Parameter sServerURL must start with authority (http:// or https://).";
			}
			if(sServerURL[sServerURL.length - 1] === "/")
			{
				sServerURL = sServerURL.substring(0, sServerURL.length - 1);
			}
			this.sServerURL = sServerURL + Constants.BaseURL;
		}

		/**
		 * Disposes the client and releases all resources. Logs out if connected.
		 */
		public Dispose(): void
		{
			if(this.IsConnected())
			{
				this.Logout(() => { }, () => { });
			}
			this.sServerURL = null;
		}

		/**
		 * Pings the server for a life sign.
		 * @param onSuccess - Triggered on success.
		 * @param onFailure - Triggered on failure.
		 */
		public Ping(onSuccess: (oResult: Models.IAboutModel) => void, onFailure: (oError: Models.IErrorModel) => void): void
		{
			$.ajax({
				url: this.sServerURL + Constants.APIURLs.About,
				method: "get",
				timeout: 30000,
				cache: false,
				success: (response, sStatusText, jqXHR) =>
				{
					var oError = this.handleError(response);
					if(oError)
					{
						onFailure(oError);
						return;
					}
					onSuccess(response);
				},
				error: (response, sStatusText, error) =>
				{
					var oError = this.handleProtocolError(response);
					onFailure(oError);
				}
			});
		}

		/**
		 * Checks if the current authentication token is still valid
		 * @param onSuccess
		 * @param onFailure
		 */
		public CheckToken(onSuccess: () => void, onFailure: (oError: Models.IErrorModel) => void): void
		{
			if(!this.IsConnected())
			{
				return;
			}
			$.ajax({
				url: this.sServerURL + Constants.APIURLs.CheckToken,
				data: {
					Authentication: this.oAuthentication
				},
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
					// Update token expiry
					this.dtTokenExpires = response.TokenExpires;
					onSuccess();
				},
				error: (response) =>
				{
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
		public Logout(onSuccess: (oResult: Models.IAboutModel) => void, onFailure: (oError: Models.IErrorModel) => void): void
		{
			if(!this.IsConnected())
			{
				return;
			}
			$.ajax({
				url: this.sServerURL + Constants.APIURLs.Logout,
				data: {
					Authentication: this.oAuthentication,
					InvalidateAllTokens:false
				},
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
					this.resetAuthentication();
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
		public Login(sUsername: string, sPassword: string, onSuccess: () => void, onFailure: (oError: Models.IErrorModel) => void): void
		{
			if(this.IsConnected())
			{
				return;
			}
			this.resetAuthentication();
			// Roll a new client secret
			this.oAuthentication = {
				Username: sUsername,
				ClientSecret: this.generateClientSecret(),
				AccessToken: null
			}
			$.ajax({
				url: this.sServerURL + Constants.APIURLs.SimpleLogin,
				data: {
					Username: this.oAuthentication.Username,
					Password: sPassword,
					ClientSecret: this.oAuthentication.ClientSecret
				},
				method: "post",
				timeout: 60000,
				cache: false,
				success: (response, sStatusText, b) =>
				{
					//console.log(sStatusText);
					console.log(b);
					var oError = this.handleError(response);
					if(oError)
					{
						this.resetAuthentication();
						onFailure(oError);
						return;
					}
					this.bIsConnected = true;
					this.oAuthentication.AccessToken = response.AccessToken;
					this.dtTokenExpires = response.TokenExpires;
					onSuccess();
				},
				error: (response, a, b) =>
				{
					this.resetAuthentication();
					console.log(a);
					console.log(b);
					var oError = this.handleProtocolError(response);
					onFailure(oError);
				}
			});
		}

		/**
		 * Logs the user in with a previously stored client token/secret. Does nothing if already logged in.
		 * @param {string} sUsername
		 * @param {string} sAccessToken
		 * @param {string} sClientSecret
		 * @param onSuccess
		 * @param onFailure
		 */
		public LoginWithToken(sUsername: string, sAccessToken: string, sClientSecret: string, onSuccess: () => void, onFailure: (oError: Models.IErrorModel) => void): void
		{
			if(this.IsConnected())
			{
				return;
			}
			this.resetAuthentication();
			// Try to login with the existing token
			this.oAuthentication = {
				Username: sUsername,
				ClientSecret: sClientSecret,
				AccessToken: sAccessToken
			}
			$.ajax({
				url: this.sServerURL + Constants.APIURLs.CheckToken,
				data: this.oAuthentication,
				method: "post",
				timeout: 60000,
				cache: false,
				success: (response, sStatusText, b) =>
				{
					//console.log(sStatusText);
					console.log(b);
					var oError = this.handleError(response);
					if(oError)
					{
						this.resetAuthentication();
						onFailure(oError);
						return;
					}
					this.bIsConnected = true;
					this.dtTokenExpires = response.TokenExpires;
					onSuccess();
				},
				error: (response, a, b) =>
				{
					this.resetAuthentication();
					console.log(a);
					console.log(b);
					var oError = this.handleProtocolError(response);
					onFailure(oError);
				}
			});
		}

		private resetAuthentication(): void
		{
			this.bIsConnected = false;
			this.oAuthentication= null;
			this.dtTokenExpires = null;
		}

		private handleError(response: any): Models.IErrorModel
		{
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

		private handleProtocolError(response: JQueryXHR): Models.IErrorModel
		{
			if(!response)
			{
				return {
					HttpErrorCode: -1,
					Error: "Unknown error",
					ErrorDetails: ""
				}
			}
			// TODO:
			console.log(response);
			var iErrorCode = -1;
			var sError = "Unknown error";
			if(response.status > 0)
			{
				iErrorCode = response.status;
			}
			if(response.statusText)
			{
				sError = response.statusText;
			}
			return {
				HttpErrorCode: iErrorCode,
				Error: sError,
				// TODO:
				ErrorDetails: ""
			};
		}

		private generateClientSecret(): string
		{
			return this.generateRandomString(64);
		}

		private generateRandomString(iLength: number): string
		{
			var sString = "";
			var sAllowedChars = "<>|^*~!#?-_.,:;¤%&/()={[]}\\\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for(var i = 0; i < iLength; i++)
			{
				sString += sAllowedChars.charAt(Math.floor(Math.random() * sString.length));
			}
			return sString;
		}
	}
}
