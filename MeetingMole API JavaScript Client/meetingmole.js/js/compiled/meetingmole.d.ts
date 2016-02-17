declare module MeetingMole {
    /**
     * MeetingMole API JavaScript Client
     */
    class JSClient {
        private oAuthentication;
        private dtTokenExpires;
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
        /**
         * True if the client is connected and authenticated
         */
        IsConnected(): boolean;
        private bIsConnected;
        /**
         * Constructs a new JS Client
         * @constructor
         * @param {string} sServerURL - The URL of the server to connect to. Must start with http:// or https://.
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
         * Checks if the current authentication token is still valid
         * @param onSuccess
         * @param onFailure
         */
        CheckToken(onSuccess: () => void, onFailure: (oError: Models.IErrorModel) => void): void;
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
        Login(sUsername: string, sPassword: string, onSuccess: () => void, onFailure: (oError: Models.IErrorModel) => void): void;
        /**
         * Logs the user in with a previously stored client token/secret. Does nothing if already logged in.
         * @param {string} sUsername
         * @param {string} sAccessToken
         * @param {string} sClientSecret
         * @param onSuccess
         * @param onFailure
         */
        LoginWithToken(sUsername: string, sAccessToken: string, sClientSecret: string, onSuccess: () => void, onFailure: (oError: Models.IErrorModel) => void): void;
        private resetAuthentication();
        private handleError(response);
        private handleProtocolError(response);
        private generateClientSecret();
        private generateRandomString(iLength);
    }
}
