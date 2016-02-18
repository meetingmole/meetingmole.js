declare module MeetingMole.SDK {
    /**
     * Handler for the Widgets API. These actions do not require client login.
     */
    class WidgetController {
        private oClient;
        /**
         * Constructs new Widgets API handler.
         * @param oClient - Client to use for the service.
         */
        constructor(oClient: JSClient);
        /**
         * Inits a capture widget.
         * @param oParams - Capture widget initialization parameters.
         */
        Capture(oParams: Models.ICaptureWidgetParameters): void;
        private captureWidgetSubmit(sEmail, oParams, onSuccess, onFailure);
        private validateEmail(sEmail);
    }
}
