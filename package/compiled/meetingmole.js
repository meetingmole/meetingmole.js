"use strict";
/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js
*/
var MeetingMole;
(function (MeetingMole) {
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
            this.sServerURL = null;
            this.sUsername = null;
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
        }
        /**
         * API Client version
         */
        JSClient.prototype.Version = function () {
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
            if (!this.bIsConnected) {
                return null;
            }
            return this.sUsername;
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
            if (this.IsConnected()) {
                this.Logout(function () { }, function () { });
            }
            this.sServerURL = null;
        };
        /**
         * Pings the server for a life sign.
         * @param onSuccess - Triggered on success.
         * @param onFailure - Triggered on failure.
         */
        JSClient.prototype.Ping = function (onSuccess, onFailure) {
            var _this = this;
            $.ajax({
                url: this.sServerURL + MeetingMole.Constants.APIURLs.About,
                method: "get",
                timeout: 30000,
                cache: false,
                success: function (response, sStatusText, jqXHR) {
                    var oError = _this.handleError(response);
                    if (oError) {
                        onFailure(oError);
                        return;
                    }
                    onSuccess(response);
                },
                error: function (response, sStatusText, error) {
                    var oError = _this.handleProtocolError(response);
                    onFailure(oError);
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
                url: MeetingMole.Constants.BaseURL + MeetingMole.Constants.APIURLs.Logout,
                method: "post",
                timeout: 30000,
                cache: false,
                success: function (response) {
                    var oError = _this.handleError(response);
                    if (oError) {
                        onFailure(oError);
                        return;
                    }
                    _this.sUsername = null;
                    _this.bIsConnected = false;
                    onSuccess(response);
                },
                error: function (response) {
                    var oError = _this.handleProtocolError(response);
                    onFailure(oError);
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
            $.ajax({
                url: MeetingMole.Constants.BaseURL + MeetingMole.Constants.APIURLs.Logout,
                method: "post",
                timeout: 30000,
                cache: false,
                success: function (response, sStatusText, b) {
                    //console.log(sStatusText);
                    console.log(b);
                    var oError = _this.handleError(response);
                    if (oError) {
                        onFailure(oError);
                        return;
                    }
                    _this.sUsername = sUsername;
                    _this.bIsConnected = false;
                    onSuccess(response);
                },
                error: function (response, a, b) {
                    console.log(a);
                    console.log(b);
                    var oError = _this.handleProtocolError(response);
                    onFailure(oError);
                }
            });
        };
        JSClient.prototype.handleError = function (response) {
            if (!response) {
                // No response from server
                return {
                    HttpErrorCode: 400,
                    Error: "No response received from server",
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
        JSClient.prototype.handleProtocolError = function (response) {
            if (!response) {
                return {
                    HttpErrorCode: -1,
                    Error: "Unknown error",
                    ErrorDetails: ""
                };
            }
            // TODO:
            console.log(response);
            var iErrorCode = -1;
            var sError = "Unknown error";
            if (response.status > 0) {
                iErrorCode = response.status;
            }
            if (response.statusText) {
                sError = response.statusText;
            }
            return {
                HttpErrorCode: iErrorCode,
                Error: sError,
                // TODO:
                ErrorDetails: "TODO:"
            };
        };
        return JSClient;
    })();
    MeetingMole.JSClient = JSClient;
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=meetingmole.js.map