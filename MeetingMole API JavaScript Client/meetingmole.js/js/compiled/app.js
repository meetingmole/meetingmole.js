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
                    log(JSON.stringify(oResult), LogTypes.Indent);
                }, function (oError) {
                    log("Ping failed.");
                    log("Error: " + JSON.stringify(oError), LogTypes.Error);
                });
            });
        }
        JSClientTest.Init = Init;
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