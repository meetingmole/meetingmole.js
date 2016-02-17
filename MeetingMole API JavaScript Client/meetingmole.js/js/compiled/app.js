"use strict";
/*
This file is for the dev/test environment only. It is not included in the final product.
*/
var MeetingMole;
(function (MeetingMole) {
    var SDK;
    (function (SDK) {
        var JSClientTest;
        (function (JSClientTest) {
            var jqResultsDisplay = null;
            var jqPingButton = null;
            var jqLoginButton = null;
            var jqLogoutButton = null;
            var jqServerURL = null;
            var jqClearLogButton = null;
            var jqGetVersionInfoButton = null;
            var jqTeamsButton = null;
            var oClient = null;
            /**
             * Inits the test app
             */
            function Init() {
                jqPingButton = $("#btnPing");
                jqLoginButton = $("#btnLogin");
                jqLogoutButton = $("#btnLogout");
                jqResultsDisplay = $("#divResponseDisplay");
                jqServerURL = $("#txServerURL");
                jqClearLogButton = $("#btnClearLog");
                jqGetVersionInfoButton = $("#btnGetVersionInfo");
                jqTeamsButton = $("#btnGetTeams");
                jqServerURL.off("change").on("change", function () {
                    if (oClient) {
                        oClient.Dispose();
                        oClient = null;
                    }
                    var sServerURL = jqServerURL.val().trim();
                    if (sServerURL) {
                        oClient = new SDK.JSClient(sServerURL);
                    }
                    else {
                        oClient = null;
                    }
                });
                jqServerURL.val("http://localhost:56936").trigger("change");
                jqClearLogButton.off("click").on("click", function () {
                    clearLog();
                });
                jqPingButton.off("click").on("click", function () {
                    if (!oClient) {
                        log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
                        return;
                    }
                    log("Pinging " + oClient.ServerURL() + "...");
                    oClient.Ping(function (fTimeTaken_ms) {
                        log("Ping success! Took " + fTimeTaken_ms + " ms.", LogTypes.Success);
                    }, function (oError) {
                        log("Ping failed.", LogTypes.Error);
                        log("Error: " + syntaxHighlight(oError));
                    });
                });
                jqGetVersionInfoButton.off("click").on("click", function () {
                    if (!oClient) {
                        log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
                        return;
                    }
                    log("Version info for " + oClient.ServerURL() + ":");
                    oClient.GetVersionInfo(function (oResult) {
                        log(syntaxHighlight(oResult));
                    }, function (oError) {
                        log("Could not get version info.");
                        log("Error: " + syntaxHighlight(oError), LogTypes.Error);
                    });
                });
                jqLoginButton.off("click").on("click", function () {
                    if (!oClient) {
                        log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
                        return;
                    }
                    if (oClient.IsConnected()) {
                        log("Already logged in.", LogTypes.Normal);
                        return;
                    }
                    log("Logging in to " + oClient.ServerURL() + "...");
                    oClient.Login($("#txLogin").val(), $("#txPassword").val(), function () {
                        log("Login success!", LogTypes.Success);
                    }, function (oError) {
                        log("Login failed.");
                        log("Error: " + syntaxHighlight(oError), LogTypes.Error);
                    });
                });
                jqLogoutButton.off("click").on("click", function () {
                    if (!oClient) {
                        log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
                        return;
                    }
                    if (!oClient.IsConnected()) {
                        log("Not logged in. Please log in first.", LogTypes.Error);
                        return;
                    }
                    log("Logging out from " + oClient.ServerURL() + "...");
                    oClient.Logout(function () {
                        log("You have been logged out.", LogTypes.Success);
                    }, function (oError) {
                        log("Logout failed.");
                        log("Error: " + syntaxHighlight(oError), LogTypes.Error);
                    });
                });
                jqTeamsButton.off("click").on("click", function () {
                    if (!oClient) {
                        log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
                        return;
                    }
                    if (!oClient.IsConnected()) {
                        log("Not logged in. Please log in first.", LogTypes.Error);
                        return;
                    }
                    log("Getting teams for " + oClient.Username() + " from " + oClient.ServerURL() + "...");
                    oClient.Teams.GetAll(function (aTeams) {
                        log("Teams got.");
                        log(syntaxHighlight(aTeams));
                    }, function (oError) {
                        log("Error: " + syntaxHighlight(oError), LogTypes.Error);
                    });
                });
            }
            JSClientTest.Init = Init;
            /**
             * From:  http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
             * @param oJSON - JSON to hilite. If not a string, will be converted to JSON string first.
             */
            function syntaxHighlight(oJSON) {
                if (typeof oJSON !== "string") {
                    oJSON = JSON.stringify(oJSON, undefined, 2);
                }
                oJSON = oJSON.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                return "<pre>" + oJSON.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                    var cls = "number";
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = "key";
                        }
                        else {
                            cls = "string";
                        }
                    }
                    else if (/true|false/.test(match)) {
                        cls = "boolean";
                    }
                    else if (/null/.test(match)) {
                        cls = "null";
                    }
                    return "<span class=\"" + cls + '">' + match + "</span>";
                }) + "</pre>";
            }
            /**
             * Log message types
             */
            var LogTypes;
            (function (LogTypes) {
                LogTypes[LogTypes["Normal"] = 0] = "Normal";
                LogTypes[LogTypes["Error"] = 1] = "Error";
                LogTypes[LogTypes["Success"] = 2] = "Success";
                LogTypes[LogTypes["Indent"] = 3] = "Indent";
            })(LogTypes || (LogTypes = {}));
            function clearLog() {
                jqResultsDisplay.empty();
            }
            function log(sText, eType) {
                if (eType === void 0) { eType = LogTypes.Normal; }
                if (!sText) {
                    return;
                }
                var sType = LogTypes[eType].toLowerCase();
                jqResultsDisplay.append("<div class='log-" + sType + "'>" + sText + "</div>");
            }
        })(JSClientTest = SDK.JSClientTest || (SDK.JSClientTest = {}));
    })(SDK = MeetingMole.SDK || (MeetingMole.SDK = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=app.js.map