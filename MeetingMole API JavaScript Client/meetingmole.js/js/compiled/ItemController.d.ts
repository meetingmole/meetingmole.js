declare module MeetingMole.SDK {
    /**
     * Handler for the Items API. These actions require client login first.
     */
    class ItemController {
        private oClient;
        /**
         * Constructs new Items API handler.
         * @param oClient - Client to use for the service.
         */
        constructor(oClient: JSClient);
    }
}
