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

declare module MeetingMole.SDK {
    /**
     * Handler for the Team Service API
     */
    class TeamService {
        private oClient;
        /**
         * Constructs new team service handler.
         * @param oClient - Client to use for the service.
         */
        constructor(oClient: JSClient);
        /**
         * Gets all teams the current user has access to.
         */
        GetAll(onSuccess: (aTeams: Models.ITeam[]) => void, onFailure: (oError: Models.IErrorModel) => void): void;
    }
}

declare module MeetingMole.Constants {
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
     * Team API action URLs
     */
    var TeamAPIURLs: {
        GetAll: string;
    };
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
    /**
     * Version info
     */
    interface IVersionInfo {
        /**
         * Version of the client SDK
         */
        ClientVersion: string;
        /**
         * Version of the server API
         */
        APIVersion: string;
        /**
         * Version of the server web app
         */
        WebAppVersion: string;
        /**
         * Version of the server core
         */
        CoreVersion: string;
    }
    /**
     * Authentication (verification) package
     */
    interface IAuthenticationModel {
        Username: string;
        AccessToken: string;
        ClientSecret: string;
    }
    /**
     * MeetingMole Team
     */
    interface ITeam {
    }
}
