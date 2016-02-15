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
         * @param {string} sServerURL - The URL of the server to connect to.
         */
        function JSClient(sServerURL) {
            this.sServerURL = null;
            this.sServerURL = sServerURL;
        }
        return JSClient;
    })();
    MeetingMole.JSClient = JSClient;
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=meetingmole.js.map