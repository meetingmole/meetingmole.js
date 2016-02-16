"use strict";
/*
This file is for the dev/test environment only. It is not included in the final product.
*/
module MeetingMole.JSClientTest {
	var jqResultsDisplay: JQuery = null;
	var jqPingButton: JQuery = null;
	var jqServerURL: JQuery = null;
	var oClient: JSClient = null;

	/**
	 * Inits the test app
	 */
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
				log("Response:" + syntaxHighlight(oResult), LogTypes.Indent);
			}, (oError) => {
				log("Ping failed.");
				log("Error: " + syntaxHighlight(oError),LogTypes.Error);
			});
		});
	}

	/**
	 * From:  http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
	 * @param oJSON - JSON to hilite. If not a string, will be converted to JSON string first.
	 */
	function syntaxHighlight(oJSON:any):string
	{
		if(typeof oJSON !== "string")
		{
			oJSON = JSON.stringify(oJSON, undefined, 2);
		}
		oJSON = oJSON.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		return "<pre>" + oJSON.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match: any)=>
		{
			var cls = "number";
			if(/^"/.test(match))
			{
				if(/:$/.test(match))
				{
					cls = "key";
				} else
				{
					cls = "string";
				}
			} else if(/true|false/.test(match))
			{
				cls = "boolean";
			} else if(/null/.test(match))
			{
				cls = "null";
			}
			return "<span class=\"" + cls + '">' + match + "</span>";
		}) + "</pre>";
	}

	/**
	 * Log message types
	 */
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
