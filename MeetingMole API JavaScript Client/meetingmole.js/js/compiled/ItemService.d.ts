declare module MeetingMole.SDK {
    /**
     * Handler for the Item Service API
     */
    class ItemService {
        private oClient;
        /**
         * Constructs new item service handler.
         * @param oClient - Client to use for the service.
         */
        constructor(oClient: JSClient);
    }
}
