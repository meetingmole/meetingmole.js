/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js 
*/
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
