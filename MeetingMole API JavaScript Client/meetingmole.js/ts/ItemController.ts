"use strict";
module MeetingMole.SDK
{
	/**
	 * Handler for the Items API. These actions require client login first.
	 */
	export class ItemController
	{
		private oClient:JSClient = null;

		/**
		 * Constructs new Items API handler.
		 * @param oClient - Client to use for the service.
		 */
		constructor(oClient:JSClient) {
			this.oClient = oClient;
		}
	}
}
