declare module MeetingMole.JSClientTest {
    /**
     * Inits the test app
     */
    function Init(): void;
}

declare module MeetingMole.Constants {
    /**
     * API Base URL
     */
    var BaseURL: string;
    /**
     * API action URLs
     */
    var APIURLs: {
        SimpleLogin: string;
        About: string;
        CheckToken: string;
        Logout: string;
    };
}

declare module MeetingMole {
    /**
     * MeetingMole API JavaScript Client
     */
    class JSClient {
        /**
         * API Client version
         */
        Version(): string;
        /**
         * Current Server URL.
         */
        ServerURL(): string;
        private sServerURL;
        /**
         * Username of the currently logged in user. Null if not logged in.
         */
        Username(): string;
        private sUsername;
        /**
         * True if the client is connected and authenticated
         */
        IsConnected(): boolean;
        private bIsConnected;
        /**
         * Constructs a new JS Client
         * @param {string} sServerURL - The URL of the server to connect to.
         */
        constructor(sServerURL: string);
        /**
         * Disposes the client and releases all resources. Logs out if connected.
         */
        Dispose(): void;
        /**
         * Pings the server for a life sign.
         * @param onSuccess - Triggered on success.
         * @param onFailure - Triggered on failure.
         */
        Ping(onSuccess: (oResult: Models.IAboutModel) => void, onFailure: (oError: Models.IErrorModel) => void): void;
        /**
         * Logs the user out
         * @param onSuccess
         * @param onFailure
         */
        Logout(onSuccess: (oResult: Models.IAboutModel) => void, onFailure: (oError: Models.IErrorModel) => void): void;
        /**
         * Logs the user in. Does nothing if already logged in.
         * @param {string} sUsername
         * @param {string} sPassword
         * @param onSuccess
         * @param onFailure
         */
        Login(sUsername: string, sPassword: string, onSuccess: (oResult: Models.IAboutModel) => void, onFailure: (oError: Models.IErrorModel) => void): void;
        private handleError(response);
        private handleProtocolError(response);
    }
}

declare module MeetingMole.Models {
    /**
     * API Error
     */
    interface IErrorModel {
        HttpErrorCode: number;
        Error: string;
        ErrorDetails: string;
    }
    /**
     * About / ping result model
     */
    interface IAboutModel {
        /**
         * Version of the API connected to.
         */
        Version: string;
        /**
         * Type of the API connected to.
         */
        APIType: string;
        /**
         * Description of the API.
         */
        APIDescription: string;
        /**
         * Time on server at the time of request.
         */
        ServerTime: Date;
    }
}
