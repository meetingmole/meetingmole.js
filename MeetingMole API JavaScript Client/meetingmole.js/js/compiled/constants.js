"use strict";
/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js
*/
var MeetingMole;
(function (MeetingMole) {
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
         * Team API action URLs
         */
        Constants.TeamAPIURLs = {
            GetAll: "team/getall"
        };
    })(Constants = MeetingMole.Constants || (MeetingMole.Constants = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=constants.js.map