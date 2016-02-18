"use strict";
var MeetingMole;
(function (MeetingMole) {
    var SDK;
    (function (SDK) {
        /**
         * Handler for the Items API. These actions require client login first.
         */
        var ItemController = (function () {
            /**
             * Constructs new Items API handler.
             * @param oClient - Client to use for the service.
             */
            function ItemController(oClient) {
                this.oClient = null;
                this.oClient = oClient;
            }
            return ItemController;
        })();
        SDK.ItemController = ItemController;
    })(SDK = MeetingMole.SDK || (MeetingMole.SDK = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=ItemController.js.map