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
