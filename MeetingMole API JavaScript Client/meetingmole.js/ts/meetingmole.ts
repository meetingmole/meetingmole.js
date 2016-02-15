module MeetingMole
{
	/**
	 * MeetingMole API JavaScript Client
	 */
	export class JSClient
	{
		private sServerURL:string = null;

		/**
		 * Constructs a new JS Client
		 * @param {string} sServerURL - The URL of the server to connect to.
		 */
		public constructor( sServerURL:string) {
			this.sServerURL = sServerURL;
		}
	}
}
