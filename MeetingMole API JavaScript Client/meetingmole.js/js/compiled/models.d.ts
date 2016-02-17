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
