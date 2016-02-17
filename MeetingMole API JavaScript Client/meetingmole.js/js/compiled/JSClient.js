"use strict";
/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js
*/
var MeetingMole;
(function (MeetingMole) {
    var SDK;
    (function (SDK) {
        /**
         * MeetingMole API JavaScript Client
         */
        var JSClient = (function () {
            /**
             * Constructs a new JS Client
             * @constructor
             * @param {string} sServerURL - The URL of the server to connect to. Must start with http:// or https://.
             */
            function JSClient(sServerURL) {
                this.oAuthentication = null;
                this.dtTokenExpires = null;
                /**
                 * Items API
                 */
                this.Items = null;
                /**
                 * Teams API
                 */
                this.Teams = null;
                this.sServerURL = null;
                this.bIsConnected = false;
                if (!sServerURL) {
                    throw "Parameter sServerURL must be defined.";
                }
                sServerURL = sServerURL.trim();
                if (sServerURL.indexOf("http://") !== 0
                    && sServerURL.indexOf("https://") !== 0) {
                    throw "Parameter sServerURL must start with authority (http:// or https://).";
                }
                if (sServerURL[sServerURL.length - 1] === "/") {
                    sServerURL = sServerURL.substring(0, sServerURL.length - 1);
                }
                this.sServerURL = sServerURL + MeetingMole.Constants.BaseURL;
                this.Items = new SDK.ItemService(this);
                this.Teams = new SDK.TeamService(this);
            }
            /**
             * Current Authentication parameters.
             */
            JSClient.prototype.Authentication = function () {
                return this.oAuthentication;
            };
            /**
             * API Client version
             */
            JSClient.prototype.ClientVersion = function () {
                return "1.0.2";
            };
            /**
             * Current Server URL.
             */
            JSClient.prototype.ServerURL = function () {
                return this.sServerURL;
            };
            /**
             * Username of the currently logged in user. Null if not logged in.
             */
            JSClient.prototype.Username = function () {
                if (!this.bIsConnected || !this.oAuthentication) {
                    return null;
                }
                return this.oAuthentication.Username;
            };
            /**
             * True if the client is connected and authenticated
             */
            JSClient.prototype.IsConnected = function () {
                return this.bIsConnected;
            };
            /**
             * Disposes the client and releases all resources. Logs out if connected.
             */
            JSClient.prototype.Dispose = function () {
                var _this = this;
                if (this.IsConnected()) {
                    this.Logout(function () { }, function () {
                        // Ignore failed logout
                        _this.resetAuthentication();
                    });
                }
                this.sServerURL = null;
            };
            /**
             * Pings the server for a life sign.
             * @param onSuccess - Triggered on success.
             * @param onFailure - Triggered on failure.
             */
            JSClient.prototype.Ping = function (onSuccess, onFailure) {
                var dtStarted = new Date();
                this.GetVersionInfo(function () {
                    var dtNow = new Date();
                    var fTimeTaken_ms = dtNow.valueOf() - dtStarted.valueOf();
                    onSuccess(fTimeTaken_ms);
                }, onFailure);
            };
            /**
             * Gets server version info.
             * @param onSuccess
             * @param onFailure
             */
            JSClient.prototype.GetVersionInfo = function (onSuccess, onFailure) {
                var _this = this;
                $.ajax({
                    url: this.sServerURL + MeetingMole.Constants.AccessAPIURLs.About,
                    method: "get",
                    timeout: 30000,
                    cache: false,
                    success: function (response, sStatusText, jqXHR) {
                        var oError = _this.HandleError(response, sStatusText, jqXHR);
                        if (oError) {
                            onFailure(oError);
                            return;
                        }
                        var oVersionInfo = {
                            ClientVersion: _this.ClientVersion(),
                            APIVersion: response.Version,
                            WebAppVersion: response.WebAppVersion,
                            CoreVersion: response.CoreVersion
                        };
                        onSuccess(oVersionInfo);
                    },
                    error: function (jqXHR, sStatusText, sResponse) {
                        _this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
                    }
                });
            };
            /**
             * Checks if the current authentication token is still valid
             * @param onSuccess
             * @param onFailure
             */
            JSClient.prototype.CheckToken = function (onSuccess, onFailure) {
                var _this = this;
                if (!this.IsConnected()) {
                    return;
                }
                $.ajax({
                    url: this.sServerURL + MeetingMole.Constants.AccessAPIURLs.CheckToken,
                    data: {
                        Authentication: this.oAuthentication
                    },
                    method: "post",
                    timeout: 30000,
                    cache: false,
                    success: function (response, sStatusText, jqXHR) {
                        var oError = _this.HandleError(response, sStatusText, jqXHR);
                        if (oError) {
                            onFailure(oError);
                            return;
                        }
                        // Update token expiry
                        _this.dtTokenExpires = response.TokenExpires;
                        onSuccess();
                    },
                    error: function (jqXHR, sStatusText, sResponse) {
                        _this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
                    }
                });
            };
            /**
             * Logs the user out
             * @param onSuccess
             * @param onFailure
             */
            JSClient.prototype.Logout = function (onSuccess, onFailure) {
                var _this = this;
                if (!this.IsConnected()) {
                    return;
                }
                $.ajax({
                    url: this.sServerURL + MeetingMole.Constants.AccessAPIURLs.Logout,
                    data: {
                        Authentication: this.oAuthentication,
                        InvalidateAllTokens: false
                    },
                    method: "post",
                    timeout: 30000,
                    cache: false,
                    success: function (response, sStatusText, jqXHR) {
                        var oError = _this.HandleError(response, sStatusText, jqXHR);
                        if (oError) {
                            onFailure(oError);
                            return;
                        }
                        _this.resetAuthentication();
                        onSuccess(response);
                    },
                    error: function (jqXHR, sStatusText, sResponse) {
                        _this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
                    }
                });
            };
            /**
             * Logs the user in. Does nothing if already logged in.
             * @param {string} sUsername
             * @param {string} sPassword
             * @param onSuccess
             * @param onFailure
             */
            JSClient.prototype.Login = function (sUsername, sPassword, onSuccess, onFailure) {
                var _this = this;
                if (this.IsConnected()) {
                    return;
                }
                this.resetAuthentication();
                // Roll a new client secret
                this.oAuthentication = {
                    Username: sUsername,
                    ClientSecret: this.generateClientSecret(),
                    AccessToken: null
                };
                $.ajax({
                    url: this.sServerURL + MeetingMole.Constants.AccessAPIURLs.SimpleLogin,
                    data: {
                        Username: this.oAuthentication.Username,
                        Password: sPassword,
                        ClientSecret: this.oAuthentication.ClientSecret
                    },
                    method: "post",
                    timeout: 60000,
                    cache: false,
                    success: function (response, sStatusText, jqXHR) {
                        var oError = _this.HandleError(response, sStatusText, jqXHR);
                        if (oError) {
                            _this.resetAuthentication();
                            onFailure(oError);
                            return;
                        }
                        _this.bIsConnected = true;
                        _this.oAuthentication.AccessToken = response.AccessToken;
                        _this.dtTokenExpires = response.TokenExpires;
                        onSuccess();
                    },
                    error: function (jqXHR, sStatusText, sResponse) {
                        _this.resetAuthentication();
                        _this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
                    }
                });
            };
            /**
             * Logs the user in with a previously stored client token/secret. Does nothing if already logged in.
             * @param {string} sUsername
             * @param {string} sAccessToken
             * @param {string} sClientSecret
             * @param onSuccess
             * @param onFailure
             */
            JSClient.prototype.LoginWithToken = function (sUsername, sAccessToken, sClientSecret, onSuccess, onFailure) {
                var _this = this;
                if (this.IsConnected()) {
                    return;
                }
                this.resetAuthentication();
                // Try to login with the existing token
                this.oAuthentication = {
                    Username: sUsername,
                    ClientSecret: sClientSecret,
                    AccessToken: sAccessToken
                };
                $.ajax({
                    url: this.sServerURL + MeetingMole.Constants.AccessAPIURLs.CheckToken,
                    data: this.oAuthentication,
                    method: "post",
                    timeout: 60000,
                    cache: false,
                    success: function (response, sStatusText, jqXHR) {
                        var oError = _this.HandleError(response, sStatusText, jqXHR);
                        if (oError) {
                            _this.resetAuthentication();
                            onFailure(oError);
                            return;
                        }
                        _this.bIsConnected = true;
                        _this.dtTokenExpires = response.TokenExpires;
                        onSuccess();
                    },
                    error: function (jqXHR, sStatusText, sResponse) {
                        _this.resetAuthentication();
                        _this.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
                    }
                });
            };
            JSClient.prototype.resetAuthentication = function () {
                this.bIsConnected = false;
                this.oAuthentication = null;
                this.dtTokenExpires = null;
            };
            /**
             * Checks if the server returned a managed error and handles it if so.
             * @param response - response received from the server.
             * @param sStatusText - status text.
             * @param jqXHR - associated jquery xhr handler.
             * @returns - null if no error, otherwise an error object.
             */
            JSClient.prototype.HandleError = function (response, sStatusText, jqXHR) {
                if (!response) {
                    // No response from server
                    return {
                        HttpErrorCode: 400,
                        Error: "No response received from server.",
                        ErrorDetails: ""
                    };
                }
                if (response.error) {
                    // Managed server error
                    return response.error;
                }
                // Not an error
                return null;
            };
            /**
             * Handles an ajax request protocol error.
             * @param response
             * @param sStatusText
             * @param jqXHR
             * @param callBack
             */
            JSClient.prototype.HandleProtocolError = function (response, sStatusText, jqXHR, callBack) {
                //console.log(response);
                //console.log(sStatusText);
                //console.log(jqXHR);
                if (!jqXHR) {
                    callBack({
                        HttpErrorCode: -1,
                        Error: "Unknown error",
                        ErrorDetails: ""
                    });
                }
                var iErrorCode = -1;
                var sError = "Unknown error";
                if (jqXHR.status > 0) {
                    iErrorCode = jqXHR.status;
                }
                if (jqXHR.statusText) {
                    sError = jqXHR.statusText;
                }
                var sErrorDetails = "";
                if (jqXHR.responseJSON) {
                    if (jqXHR.responseJSON.Message) {
                        sErrorDetails = jqXHR.responseJSON.Message;
                    }
                    if (jqXHR.responseJSON.ModelState) {
                        for (var oIndexer in jqXHR.responseJSON.ModelState) {
                            if (!jqXHR.responseJSON.ModelState.hasOwnProperty(oIndexer)) {
                                continue;
                            }
                            var aErrors = jqXHR.responseJSON.ModelState[oIndexer];
                            sErrorDetails += " " + aErrors.join(" ");
                        }
                    }
                }
                callBack({
                    HttpErrorCode: iErrorCode,
                    Error: sError,
                    ErrorDetails: sErrorDetails
                });
            };
            JSClient.prototype.generateClientSecret = function () {
                return this.generateRandomString(64);
            };
            JSClient.prototype.generateRandomString = function (iLength) {
                var sString = "";
                var sAllowedChars = "<>|^*~!#?-_.,:;¤%&/()={[]}\\\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < iLength; i++) {
                    sString += sAllowedChars.charAt(Math.floor(Math.random() * sString.length));
                }
                return sString;
            };
            return JSClient;
        })();
        SDK.JSClient = JSClient;
    })(SDK = MeetingMole.SDK || (MeetingMole.SDK = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=JSClient.js.map