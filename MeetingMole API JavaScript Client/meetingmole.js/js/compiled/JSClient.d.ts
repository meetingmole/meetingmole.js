declare module MeetingMole.SDK {
    /**
     * MeetingMole API JavaScript Client
     */
    class JSClient {
        /**
         * Constructs a new JS Client
         * @constructor
         * @param {string} sServerURL - The URL of the server to connect to. Must start with http:// or https://.
         */
        constructor(sServerURL: string);
        /**
         * Current Authentication parameters.
         */
        Authentication(): Models.IAuthenticationModel;
        private oAuthentication;
        private dtTokenExpires;
        /**
         * Items API
         */
        Items: ItemService;
        /**
         * Teams API
         */
        Teams: TeamService;
        /**
         * API Client version
         */
        ClientVersion(): string;
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
         * Disposes the client and releases all resources. Logs out if connected.
         */
        Dispose(): void;
        /**
         * Pings the server for a life sign.
         * @param onSuccess - Triggered on success.
         * @param onFailure - Triggered on failure.
         */
        Ping(onSuccess: (fTimeTaken_ms: number) => void, onFailure: (oError: Models.IErrorModel) => void): void;
        /**
         * Gets server version info.
         * @param onSuccess
         * @param onFailure
         */
        GetVersionInfo(onSuccess: (oResult: Models.IVersionInfo) => void, onFailure: (oError: Models.IErrorModel) => void): void;
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
        /**
         * Checks if the server returned a managed error and handles it if so.
         * @param response - response received from the server.
         * @param sStatusText - status text.
         * @param jqXHR - associated jquery xhr handler.
         * @returns - null if no error, otherwise an error object.
         */
        HandleError(response: any, sStatusText: string, jqXHR: JQueryXHR): Models.IErrorModel;
        /**
         * Handles an ajax request protocol error.
         * @param response
         * @param sStatusText
         * @param jqXHR
         * @param callBack
         */
        HandleProtocolError(response: any, sStatusText: string, jqXHR: JQueryXHR, callBack: (oError: Models.IErrorModel) => void): void;
        private generateClientSecret();
        private generateRandomString(iLength);
    }
}
