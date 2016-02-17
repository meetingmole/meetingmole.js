module MeetingMole.SDK
{
	/**
	 * Handler for the Team Service API
	 */
	export class TeamService
	{
		private oClient:JSClient = null;

		/**
		 * Constructs new team service handler.
		 * @param oClient - Client to use for the service.
		 */
		constructor(oClient:JSClient) {
			this.oClient = oClient;
		}

		/**
		 * Gets all teams the current user has access to.
		 */
		public GetAll(onSuccess: (aTeams: Models.ITeam[]) => void, onFailure: (oError: Models.IErrorModel) => void): void
		{
			$.ajax({
				url: this.oClient.ServerURL() + Constants.TeamAPIURLs.GetAll,
				data: {
					Authentication: this.oClient.Authentication()
				},
				method: "post",
				timeout: 30000,
				cache: false,
				success: (response:any, sStatusText: string, jqXHR: JQueryXHR) =>
				{
					var oError = this.oClient.HandleError(response,sStatusText,jqXHR);
					if(oError)
					{
						onFailure(oError);
						return;
					}
					onSuccess(response.Teams);
				},
				error: (jqXHR: JQueryXHR, sStatusText: string, sResponse: string) =>
				{
					this.oClient.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
				}
			});
			
		}
	}
}