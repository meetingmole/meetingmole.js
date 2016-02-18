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
        var Constants;
        (function (Constants) {
            /**
             * API Base URL
             */
            Constants.BaseURL = "/publicapi/v1/";
            /**
             * Access API action URLs
             */
            Constants.AccessAPIURLs = {
                SimpleLogin: "access/simplelogin",
                About: "access/about",
                CheckToken: "access/checktoken",
                Logout: "access/logout"
            };
            /**
             * Teams API action URLs
             */
            Constants.TeamsAPIURLs = {
                GetAll: "teams/getall"
            };
            /**
             * Widget API action URLs
             */
            Constants.WidgetsAPIURLs = {
                CaptureSubmit: "widgets/capturesubmit"
            };
            /**
             * Unified error codes across the sdk.
             * System errors range: 0-99.
             * Widget errors range: 100-199.
             *
             */
            (function (ErrorCodes) {
                /**
                 * Unknown error.
                 */
                ErrorCodes[ErrorCodes["UnknownError"] = 0] = "UnknownError";
                /**
                 * Http protocol error or server exception.
                 */
                ErrorCodes[ErrorCodes["HttpError"] = 1] = "HttpError";
                /**
                 * The request succeeded, but the server returned an empty response.
                 */
                ErrorCodes[ErrorCodes["EmptyResponse"] = 2] = "EmptyResponse";
                /**
                 * A logical error occurred on the server, which prevented the action from being executed.
                 */
                ErrorCodes[ErrorCodes["ServerRejected"] = 3] = "ServerRejected";
                ErrorCodes[ErrorCodes["WidgetError_EmailAddressInvalid"] = 100] = "WidgetError_EmailAddressInvalid";
            })(Constants.ErrorCodes || (Constants.ErrorCodes = {}));
            var ErrorCodes = Constants.ErrorCodes;
        })(Constants = SDK.Constants || (SDK.Constants = {}));
    })(SDK = MeetingMole.SDK || (MeetingMole.SDK = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=constants.js.map