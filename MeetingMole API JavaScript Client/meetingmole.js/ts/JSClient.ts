"use strict";
/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js 
*/
module MeetingMole.SDK
{
	/**
	 * MeetingMole API JavaScript Client
	 */
	export class JSClient
	{
		/**
		 * Constructs a new JS Client
		 * @constructor 
		 * @param {string} sServerURL - The URL of the server to connect to. Must start with http:// or https://.
		 */
		public constructor(sServerURL: string)
		{
			if(!jQuery)
			{
				throw "meetingmole.js requires jQuery.";
			}
			if(!sServerURL)
			{
				throw "meetingmole.js: Parameter sServerURL must be defined.";
			}
			sServerURL = sServerURL.trim();
			if(sServerURL.indexOf("http://") !== 0
				&& sServerURL.indexOf("https://") !== 0
			)
			{
				throw "meetingmole.js: Parameter sServerURL must start with authority (http:// or https://).";
			}
			if(sServerURL[sServerURL.length - 1] === "/")
			{
				sServerURL = sServerURL.substring(0, sServerURL.length - 1);
			}
			this.sServerURL = sServerURL + Constants.BaseURL;
			this.Items = new ItemController(this);
			this.Teams = new TeamController(this);
			this.Widgets = new WidgetController(this);
		}

		/**
		 * Current Authentication parameters.
		 */
		public Authentication(): Models.IAuthenticationModel 
		{
			return this.oAuthentication;
		}
		private oAuthentication: Models.IAuthenticationModel = null;
		private dtTokenExpires: Date = null;

		/**
		 * Items API. Item actions require client login first.
		 */
		public Items: ItemController = null;

		/**
		 * Teams API. Team actions require client login first.
		 */
		public Teams: TeamController = null;

		/**
		 * Widgets API. Widget actions do not require client login.
		 */
		public Widgets: WidgetController = null;

		/**
		 * API Client version
		 */
		public ClientVersion(): string
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
		 * Disposes the client and releases all resources. Logs out if connected.
		 */
		public Dispose(): void
		{
			if(this.IsConnected())
			{
				this.Logout(() => { }, () =>
				{
					// Ignore failed logout
					this.resetAuthentication();
				});
			}
			this.sServerURL = null;
		}

		/**
		 * Pings the server for a life sign.
		 * @param onSuccess - Triggered on success.
		 * @param onFailure - Triggered on failure.
		 */
		public Ping(onSuccess: (fTimeTaken_ms: number) => void, onFailure: (oError: Models.IErrorModel) => void): void
		{
			var dtStarted = new Date();
			this.GetVersionInfo(() =>
			{
				var dtNow = new Date();
				var fTimeTaken_ms = dtNow.valueOf() - dtStarted.valueOf();
				onSuccess(fTimeTaken_ms);
			}, onFailure);
		}

		/**
		 * Gets server version info.
		 * @param onSuccess
		 * @param onFailure
		 */
		public GetVersionInfo(onSuccess: (oResult: Models.IVersionInfo) => void, onFailure: (oError: Models.IErrorModel) => void): void
		{
			$.ajax({
				url: this.sServerURL + Constants.AccessAPIURLs.About,
				method: "get",
				timeout: 30000,
				cache: false,
				success: (response, sStatusText, jqXHR) =>
				{
					var oError = this.HandleError(response, sStatusText, jqXHR);
					if(oError)
					{
						onFailure(oError);
						return;
					}
					var oVersionInfo: Models.IVersionInfo =
						{
							ClientVersion: this.ClientVersion(),
							APIVersion: response.Version,
							WebAppVersion: response.WebAppVersion,
							CoreVersion: response.CoreVersion
						};
					onSuccess(oVersionInfo);
				},
				error: (jqXHR: JQueryXHR, sStatusText: string, sResponse: string) =>
				{
					this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
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
				url: this.sServerURL + Constants.AccessAPIURLs.CheckToken,
				data: {
					Authentication: this.oAuthentication
				},
				method: "post",
				timeout: 30000,
				cache: false,
				success: (response: any, sStatusText: string, jqXHR: JQueryXHR) =>
				{
					var oError = this.HandleError(response, sStatusText, jqXHR);
					if(oError)
					{
						onFailure(oError);
						return;
					}
					// Update token expiry
					this.dtTokenExpires = response.TokenExpires;
					onSuccess();
				},
				error: (jqXHR: JQueryXHR, sStatusText: string, sResponse: string) =>
				{
					this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
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
				url: this.sServerURL + Constants.AccessAPIURLs.Logout,
				data: {
					Authentication: this.oAuthentication,
					InvalidateAllTokens: false
				},
				method: "post",
				timeout: 30000,
				cache: false,
				success: (response: any, sStatusText: string, jqXHR: JQueryXHR) =>
				{
					var oError = this.HandleError(response, sStatusText, jqXHR);
					if(oError)
					{
						onFailure(oError);
						return;
					}
					this.resetAuthentication();
					onSuccess(response);
				},
				error: (jqXHR: JQueryXHR, sStatusText: string, sResponse: string) =>
				{
					this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
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
				url: this.sServerURL + Constants.AccessAPIURLs.SimpleLogin,
				data: {
					Username: this.oAuthentication.Username,
					Password: sPassword,
					ClientSecret: this.oAuthentication.ClientSecret
				},
				method: "post",
				timeout: 60000,
				cache: false,
				success: (response: any, sStatusText: string, jqXHR: JQueryXHR) =>
				{
					var oError = this.HandleError(response, sStatusText, jqXHR);
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
				error: (jqXHR: JQueryXHR, sStatusText: string, sResponse: string) =>
				{
					this.resetAuthentication();
					this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
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
				url: this.sServerURL + Constants.AccessAPIURLs.CheckToken,
				data: this.oAuthentication,
				method: "post",
				timeout: 60000,
				cache: false,
				success: (response: any, sStatusText: string, jqXHR: JQueryXHR) =>
				{
					var oError = this.HandleError(response, sStatusText, jqXHR);
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
				error: (jqXHR: JQueryXHR, sStatusText: string, sResponse: string) =>
				{
					this.resetAuthentication();
					this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
				}
			});
		}

		private resetAuthentication(): void
		{
			this.bIsConnected = false;
			this.oAuthentication = null;
			this.dtTokenExpires = null;
		}

		/**
		 * Checks if the server returned a managed error and handles it if so.
		 * @param response - response received from the server.
		 * @param sStatusText - status text.
		 * @param jqXHR - associated jquery xhr handler.
		 * @returns - null if no error, otherwise an error object.
		 */
		public HandleError(response: any, sStatusText: string, jqXHR: JQueryXHR): Models.IErrorModel
		{
			// Interpret "false" as a valid response, not an error.
			if(response !== false && !response)
			{
				// No response from server
				return {
					HttpErrorCode: 400,
					Error: "No response received from server.",
					ErrorDetails: "",
					ClientErrorCode: Constants.ErrorCodes.EmptyResponse,
					ClientErrorConstant: Constants.ErrorCodes[Constants.ErrorCodes.EmptyResponse]
				}
			}
			if(response.error)
			{
				// Managed server error
				var oError: Models.IErrorModel = response.error;
				oError.ClientErrorCode = Constants.ErrorCodes.ServerRejected;
				oError.ClientErrorConstant = Constants.ErrorCodes[Constants.ErrorCodes.ServerRejected];
				return oError;
			}
			// Not an error
			return null;
		}

		/**
		 * Handles an ajax request protocol error.
		 * @param response
		 * @param sStatusText
		 * @param jqXHR
		 * @param callBack
		 */
		public HandleProtocolError(response: any, sStatusText: string, jqXHR: JQueryXHR, callBack: (oError: Models.IErrorModel) => void): void
		{
			//console.log(response);
			//console.log(sStatusText);
			//console.log(jqXHR);
			if(!jqXHR)
			{
				callBack({
					HttpErrorCode: -1,
					Error: "Unknown error",
					ErrorDetails: "",
					ClientErrorCode: Constants.ErrorCodes.UnknownError,
					ClientErrorConstant: Constants.ErrorCodes[Constants.ErrorCodes.UnknownError]
				});
			}
			var iErrorCode = -1;
			var sError = "Unknown error";
			if(jqXHR.status > 0)
			{
				iErrorCode = jqXHR.status;
			}
			if(jqXHR.statusText)
			{
				sError = jqXHR.statusText;
			}
			var sErrorDetails = "";
			if(jqXHR.responseJSON)
			{
				if(jqXHR.responseJSON.Message)
				{
					sErrorDetails = jqXHR.responseJSON.Message;
				}
				if(jqXHR.responseJSON.ModelState)
				{
					for(var oIndexer in jqXHR.responseJSON.ModelState)
					{
						if(!jqXHR.responseJSON.ModelState.hasOwnProperty(oIndexer))
						{
							continue;
						}
						var aErrors: string[] = jqXHR.responseJSON.ModelState[oIndexer];
						sErrorDetails += " " + aErrors.join(" ");
					}
				}
			}
			callBack({
				HttpErrorCode: iErrorCode,
				Error: sError,
				ErrorDetails: sErrorDetails,
				ClientErrorCode: iErrorCode > 0 ? Constants.ErrorCodes.HttpError : Constants.ErrorCodes.UnknownError,
				ClientErrorConstant: iErrorCode > 0 ? Constants.ErrorCodes[Constants.ErrorCodes.HttpError] : Constants.ErrorCodes[Constants.ErrorCodes.UnknownError]
			});
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
