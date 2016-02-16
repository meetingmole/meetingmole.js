"use strict";
/*
This file is for the dev/test environment only. It is not included in the final product.
*/
module MeetingMole.JSClientTest {
	var jqResultsDisplay: JQuery = null;
	var jqPingButton: JQuery = null;
	var jqServerURL: JQuery = null;
	var oClient: JSClient = null;

	export function Init(): void {
		jqPingButton = $("#btnPing");
		jqResultsDisplay= $("#divResponseDisplay");
		jqServerURL = $("#txServerURL");

		jqServerURL.off("change").on("change", () => {
			if (oClient) {
				oClient.Dispose();
				oClient = null;
			}
			var sServerURL = jqServerURL.val().trim();
			if (sServerURL) {
				oClient = new MeetingMole.JSClient(sServerURL);
			} else {
				oClient = null;
			}
		});
		jqServerURL.val("http://localhost:56936").trigger("change");
		jqPingButton.off("click").on("click", () =>
		{
			if(!oClient) {
				log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
				return;
			}
			log("Pinging "+oClient.ServerURL()+"...");
			oClient.Ping((oResult) => {
				log("Ping success!", LogTypes.Success);
				log(JSON.stringify(oResult), LogTypes.Indent);
			}, (oError) => {
				log("Ping failed.");
				log("Error: " + JSON.stringify(oError),LogTypes.Error);
			});
		});
	}

	enum LogTypes
	{
		Normal,
		Error,
		Success,
		Indent
	}

	function log(sText: string, eType:LogTypes=LogTypes.Normal)
	{
		if(!sText) {
			return;
		}
		var sType = LogTypes[ eType].toLowerCase();
		jqResultsDisplay.append("<div class='log-"+sType+"'>"+sText+"</div>");
	}
}
