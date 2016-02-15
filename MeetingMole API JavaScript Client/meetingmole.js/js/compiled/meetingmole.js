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