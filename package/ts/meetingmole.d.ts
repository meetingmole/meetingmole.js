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
         * Items API. Item actions require client login first.
         */
        Items: ItemController;
        /**
         * Teams API. Team actions require client login first.
         */
        Teams: TeamController;
        /**
         * Widgets API. Widget actions do not require client login.
         */
        Widgets: WidgetController;
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
     * Handler for the Teams API. These actions require client login first.
     */
    class TeamController {
        private oClient;
        /**
         * Constructs new Teams API handler.
         * @param oClient - Client to use for the service.
         */
        constructor(oClient: JSClient);
        /**
         * Gets all teams the current user has access to.
         */
        GetAll(onSuccess: (aTeams: Models.ITeam[]) => void, onFailure: (oError: Models.IErrorModel) => void): void;
        /**
         * Gets a team by ID.
         */
        Get(iTeamID: number, onSuccess: (oTeam: Models.ITeam) => void, onFailure: (oError: Models.IErrorModel) => void): void;
    }
}

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
        Get: string;
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

declare module MeetingMole.SDK.Models {
    /**
     * API Error object.
     */
    interface IErrorModel {
        /**
         * Http Error code if any.
         */
        HttpErrorCode: number;
        /**
         * Short error message. Error messages are always in English, unless triggered by the local browser without server interaction.
         */
        Error: string;
        /**
         * Error details, if any.
         */
        ErrorDetails: string;
        /**
         * Client library error code.
         */
        ClientErrorCode: Constants.ErrorCodes;
        /**
         * Client library error constant.
         */
        ClientErrorConstant: string;
    }
    /**
     * About / ping result model.
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
     * Version info.
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
     * Authentication (verification) package. To resume an interrupted API session without username/password login, all of these parameters must be passed.
     */
    interface IAuthenticationModel {
        /**
         * User login, username or email address.
         */
        Username: string;
        /**
         * Current API access token.
         */
        AccessToken: string;
        /**
         * Current client secret. Client secret is defined by you and is used to encrypt the tokens so that they cannot be manipulated on the server.
         * It can also be considered to be a "local session token".
         */
        ClientSecret: string;
    }
    /**
     * MeetingMole Team
     */
    interface ITeam {
        /**
         * ID of the team.
         */
        TeamID: number;
        /**
         * Name of the team.
         */
        TeamName: string;
    }
    /**
     * Capture widget initialization parameters.
     */
    interface ICaptureWidgetParameters {
        /**
         * Optional. ID of the email field to wire the widget to. If not defined, you must supply the email via other means (as in OnSubmit event).
         */
        EmailFieldID?: string;
        /**
         * Mandatory. ID of the button to wire the widget to.
         */
        ButtonID: string;
        /**
         * Mandatory. ID of the team the widget belongs to.
         */
        TeamID: number;
        /**
         * Mandatory. ID of the widget definition on the server.
         */
        WidgetID: string;
        /**
         * Mandatory. API Key to use for authentication and origin validation.
         */
        API_KEY: string;
        /**
         * Optional. Triggers just before the request is sent to the server.
         * If no email field is specified, must return the email address to add to the campaign. Otherwise should return null.
         */
        OnSubmit?: () => string;
        /**
         * Optional. Triggers if an error occurs.
         * @param {IErrorModel} oError - Error object.
         */
        OnError?: (oError: IErrorModel) => void;
        /**
         * Optional. Triggers upon success.
         */
        OnSuccess?: () => void;
        /**
         * Optional. Triggers upon completion (whether error or success, triggered last)
         * @param {boolean} bSuccess - True if the request was successful.
         */
        OnComplete?: (bSuccess: boolean) => void;
    }
}
