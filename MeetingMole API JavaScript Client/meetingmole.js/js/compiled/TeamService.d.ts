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
