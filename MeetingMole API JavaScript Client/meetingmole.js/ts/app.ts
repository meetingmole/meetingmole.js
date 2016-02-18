"use strict";
/*
This file is for the dev/test environment only. It is not included in the final product.
*/
module MeetingMole.SDK.JSClientTest {
	var jqResultsDisplay: JQuery = null;
	var jqPingButton: JQuery = null;
	var jqLoginButton: JQuery = null;
	var jqLogoutButton: JQuery = null;
	var jqServerURL: JQuery = null;
	var jqClearLogButton: JQuery = null;
	var jqGetVersionInfoButton: JQuery = null;
	var jqTeamsButton: JQuery = null;
	var oClient: JSClient = null;

	/**
	 * Inits the test app
	 */
	export function Init(): void {
		jqPingButton = $("#btnPing");
		jqLoginButton = $("#btnLogin");
		jqLogoutButton = $("#btnLogout");
		jqResultsDisplay= $("#divResponseDisplay");
		jqServerURL = $("#txServerURL");
		jqClearLogButton = $("#btnClearLog");
		jqGetVersionInfoButton = $("#btnGetVersionInfo");
		jqTeamsButton = $("#btnGetTeams");

		jqServerURL.off("change").on("change", () => {
			if (oClient) {
				oClient.Dispose();
				oClient = null;
			}
			var sServerURL = jqServerURL.val().trim();
			if (sServerURL) {
				oClient = new JSClient(sServerURL);
			} else {
				oClient = null;
			}
		});
		jqServerURL.val("http://localhost:56936").trigger("change");

		jqClearLogButton.off("click").on("click", () =>
		{
			clearLog();
		});

		jqPingButton.off("click").on("click", () =>
		{
			if(!oClient) {
				log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
				return;
			}
			log("Pinging "+oClient.ServerURL()+"...");
			oClient.Ping((fTimeTaken_ms) => {
				log("Ping success! Took " + fTimeTaken_ms + " ms.", LogTypes.Success);
			}, (oError) => {
				log("Ping failed.", LogTypes.Error);
				log("Error: " + syntaxHighlight(oError));
			});
		});

		jqGetVersionInfoButton.off("click").on("click", () =>
		{
			if(!oClient)
			{
				log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
				return;
			}
			log("Version info for " + oClient.ServerURL() + ":");
			oClient.GetVersionInfo((oResult) =>
			{
				log(syntaxHighlight(oResult));
			}, (oError) =>
			{
				log("Could not get version info.");
				log("Error: " + syntaxHighlight(oError), LogTypes.Error);
			});
		});
		jqLoginButton.off("click").on("click", () =>
		{
			if(!oClient)
			{
				log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
				return;
			}
			if(oClient.IsConnected())
			{
				log("Already logged in.", LogTypes.Normal);
				return;
			}
			log("Logging in to " + oClient.ServerURL() + "...");
			oClient.Login($("#txLogin").val(), $("#txPassword").val(),() =>
			{
				log("Login success!", LogTypes.Success);
			}, (oError) =>
			{
				log("Login failed.");
				log("Error: " + syntaxHighlight(oError), LogTypes.Error);
			});
		});

		jqLogoutButton.off("click").on("click", () =>
		{
			if(!oClient)
			{
				log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
				return;
			}
			if(!oClient.IsConnected())
			{
				log("Not logged in. Please log in first.", LogTypes.Error);
				return;
			}
			log("Logging out from " + oClient.ServerURL() + "...");
			oClient.Logout(() =>
			{
				log("You have been logged out.", LogTypes.Success);
			}, (oError) =>
				{
					log("Logout failed.");
					log("Error: " + syntaxHighlight(oError), LogTypes.Error);
				});
		});

		jqTeamsButton.off("click").on("click", () =>
		{
			if(!oClient)
			{
				log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
				return;
			}
			if(!oClient.IsConnected())
			{
				log("Not logged in. Please log in first.", LogTypes.Error);
				return;
			}
			log("Getting teams for "+ oClient.Username() +" from " + oClient.ServerURL() + "...");
			oClient.Teams.GetAll((aTeams) =>
			{
				log("Teams got.");
				log(syntaxHighlight(aTeams));
			}, (oError) =>
				{
					log("Error: " + syntaxHighlight(oError), LogTypes.Error);
				});
		});
		// Wire normal click to the capture widget that rewires the capture click every time
		$("#btnCapture").off("click").on("click", (e) => {
			e.stopPropagation();
			e.preventDefault();
			wireCaptureWidget();
			return false;
		});
	}

	function wireCaptureWidget(): void {
		// Wire the capture widget only if all fields are filled (not testing init here)
		var sAPIKey = $("#txCaptureWidgetAPIKey").val();
		var sWidgetID = $("#txCaptureWidgetID").val();
		var sTeamID = $("#txCaptureWidgetTeamID").val();
		var iTeamID = parseInt(sTeamID, 10) || -1;
		if(!sAPIKey || !sWidgetID || iTeamID < 1) {
			log("To test the widget, please define API KEY, Widget ID and Team ID first.", LogTypes.Error);
			return;
		}
		var oParams: Models.ICaptureWidgetParameters = {
			EmailFieldID: "txCaptureWidgetEmail",
			ButtonID: "btnCapture",
			TeamID: iTeamID,
			WidgetID: sWidgetID,
			API_KEY: sAPIKey,
			OnSubmit: (): string => {
				log("Capturing...");
				// Get from the field
				return null;
			},
			OnError: (oError) => {
				log("ERROR:", LogTypes.Error);
				log(syntaxHighlight(oError));
			},
			OnSuccess: () => {
				log("Captured!", LogTypes.Success);
			},
			OnComplete: () =>
			{
				// Unwire the click so we can rewire
				$("#btnCapture").off("click.capturewidget");
			}
		};
		oClient.Widgets.Capture(oParams);
		// ...and trigger the actual click right away
		$("#btnCapture").trigger("click.capturewidget");
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

	function clearLog() {
		jqResultsDisplay.empty();
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
