declare module MeetingMole.SDK.Constants {
    /**
     * API Base URL
     */
    var BaseURL: string;
    /**
     * Access API action URLs
     */
    var AccessAPIURLs: {
        SimpleLogin: string;
        About: string;
        CheckToken: string;
        Logout: string;
    };
    /**
     * Teams API action URLs
     */
    var TeamsAPIURLs: {
        GetAll: string;
    };
    /**
     * Widget API action URLs
     */
    var WidgetsAPIURLs: {
        CaptureSubmit: string;
    };
    /**
     * Unified error codes across the sdk.
     * System errors range: 0-99.
     * Widget errors range: 100-199.
     *
     */
    enum ErrorCodes {
        /**
         * Unknown error.
         */
        UnknownError = 0,
        /**
         * Http protocol error or server exception.
         */
        HttpError = 1,
        /**
         * The request succeeded, but the server returned an empty response.
         */
        EmptyResponse = 2,
        /**
         * A logical error occurred on the server, which prevented the action from being executed.
         */
        ServerRejected = 3,
        WidgetError_EmailAddressInvalid = 100,
    }
}
