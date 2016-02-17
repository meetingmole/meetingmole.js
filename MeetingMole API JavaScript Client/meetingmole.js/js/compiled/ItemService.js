var MeetingMole;
(function (MeetingMole) {
    var SDK;
    (function (SDK) {
        /**
         * Handler for the Item Service API
         */
        var ItemService = (function () {
            /**
             * Constructs new item service handler.
             * @param oClient - Client to use for the service.
             */
            function ItemService(oClient) {
                this.oClient = null;
                this.oClient = oClient;
            }
            return ItemService;
        })();
        SDK.ItemService = ItemService;
    })(SDK = MeetingMole.SDK || (MeetingMole.SDK = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=ItemService.js.map