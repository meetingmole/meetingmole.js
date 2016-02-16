"use strict";
/*
This file is for the dev/test environment only. It is not included in the final product.
*/
var MeetingMole;
(function (MeetingMole) {
    var JSClientTest;
    (function (JSClientTest) {
        var jqResultsDisplay = null;
        var jqPingButton = null;
        var jqServerURL = null;
        var oClient = null;
        /**
         * Inits the test app
         */
        function Init() {
            jqPingButton = $("#btnPing");
            jqResultsDisplay = $("#divResponseDisplay");
            jqServerURL = $("#txServerURL");
            jqServerURL.off("change").on("change", function () {
                if (oClient) {
                    oClient.Dispose();
                    oClient = null;
                }
                var sServerURL = jqServerURL.val().trim();
                if (sServerURL) {
                    oClient = new MeetingMole.JSClient(sServerURL);
                }
                else {
                    oClient = null;
                }
            });
            jqServerURL.val("http://localhost:56936").trigger("change");
            jqPingButton.off("click").on("click", function () {
                if (!oClient) {
                    log("Not connected to server. Please define server URL to connect to.", LogTypes.Error);
                    return;
                }
                log("Pinging " + oClient.ServerURL() + "...");
                oClient.Ping(function (oResult) {
                    log("Ping success!", LogTypes.Success);
                    log("Response:" + syntaxHighlight(oResult), LogTypes.Indent);
                }, function (oError) {
                    log("Ping failed.");
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
        function log(sText, eType) {
            if (eType === void 0) { eType = LogTypes.Normal; }
            if (!sText) {
                return;
            }
            var sType = LogTypes[eType].toLowerCase();
            jqResultsDisplay.append("<div class='log-" + sType + "'>" + sText + "</div>");
        }
    })(JSClientTest = MeetingMole.JSClientTest || (MeetingMole.JSClientTest = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=app.js.map