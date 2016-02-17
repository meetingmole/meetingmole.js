module MeetingMole.SDK
{
	/**
	 * Handler for the Item Service API
	 */
	export class ItemService
	{
		private oClient:JSClient = null;

		/**
		 * Constructs new item service handler.
		 * @param oClient - Client to use for the service.
		 */
		constructor(oClient:JSClient) {
			this.oClient = oClient;
		}
	}
}