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
