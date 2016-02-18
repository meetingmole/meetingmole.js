"use strict";
var MeetingMole;
(function (MeetingMole) {
    var SDK;
    (function (SDK) {
        /**
         * Handler for the Widgets API. These actions do not require client login.
         */
        var WidgetController = (function () {
            /**
             * Constructs new Widgets API handler.
             * @param oClient - Client to use for the service.
             */
            function WidgetController(oClient) {
                this.oClient = null;
                this.oClient = oClient;
            }
            /**
             * Inits a capture widget.
             * @param oParams - Capture widget initialization parameters.
             */
            WidgetController.prototype.Capture = function (oParams) {
                var _this = this;
                if (!oParams.API_KEY) {
                    throw "meetingmole.js: API_KEY must be defined for the Capture Widget.";
                }
                if (!oParams.TeamID || oParams.TeamID < 1) {
                    throw "meetingmole.js: TeamID must be defined for the Capture Widget.";
                }
                if (!oParams.WidgetID || oParams.WidgetID.trim() === "") {
                    throw "meetingmole.js: WidgetID must be defined for the Capture Widget.";
                }
                if (!oParams.ButtonID || oParams.ButtonID.trim() === "") {
                    throw "meetingmole.js: ButtonID must be defined for the Capture Widget.";
                }
                var jqButton = $("#" + oParams.ButtonID);
                if (jqButton.length < 1) {
                    throw "meetingmole.js: ButtonID must be of a clickable element present on the page.";
                }
                var jqEmailField = null;
                if (oParams.EmailFieldID && oParams.EmailFieldID.trim() !== "") {
                    // Email field is optional, but must be present if defined
                    jqEmailField = $("#" + oParams.EmailFieldID);
                    if (jqEmailField.length < 1 || jqEmailField.get(0).tagName.toLowerCase() !== "input") {
                        throw "meetingmole.js: EmailFieldID must be of an input element present on the page.";
                    }
                }
                else {
                    // Email field not defined, must define onsubmit
                    if (!oParams.OnSubmit) {
                        throw "meetingmole.js: OnSubmit event must be defined and return a valid email address when EmailFieldID is not defined.";
                    }
                }
                jqButton.off("click.capturewidget").on("click.capturewidget", function () {
                    // Validate
                    var sEmail;
                    if (jqEmailField) {
                        // Email field is present, get the email from that and validate
                        sEmail = jqEmailField.val();
                        if (oParams.OnSubmit) {
                            // Run optional onsubmit, but do not take the email address
                            oParams.OnSubmit();
                        }
                    }
                    else {
                        // Email field not defined, get email from onsubmit
                        sEmail = oParams.OnSubmit();
                    }
                    if (!_this.validateEmail(sEmail)) {
                        if (oParams.OnError) {
                            oParams.OnError({
                                HttpErrorCode: -1,
                                Error: "Please define a valid email address.",
                                ErrorDetails: "",
                                ClientErrorCode: SDK.Constants.ErrorCodes.WidgetError_EmailAddressInvalid,
                                ClientErrorConstant: SDK.Constants.ErrorCodes[SDK.Constants.ErrorCodes.WidgetError_EmailAddressInvalid]
                            });
                        }
                        if (oParams.OnComplete) {
                            oParams.OnComplete(false);
                        }
                        return;
                    }
                    // OK, submit it
                    _this.captureWidgetSubmit(sEmail, oParams, function () {
                        // Success
                        if (oParams.OnSuccess) {
                            oParams.OnSuccess();
                        }
                        if (oParams.OnComplete) {
                            oParams.OnComplete(true);
                        }
                    }, function (oError) {
                        if (oParams.OnError) {
                            oParams.OnError(oError);
                        }
                        if (oParams.OnComplete) {
                            oParams.OnComplete(false);
                        }
                    });
                });
            };
            WidgetController.prototype.captureWidgetSubmit = function (sEmail, oParams, onSuccess, onFailure) {
                var _this = this;
                $.ajax({
                    url: this.oClient.ServerURL() + SDK.Constants.WidgetsAPIURLs.CaptureSubmit,
                    data: {
                        API_KEY: oParams.API_KEY,
                        WidgetID: oParams.WidgetID,
                        TeamID: oParams.TeamID,
                        Params: {
                            Email: sEmail
                        }
                    },
                    method: "post",
                    timeout: 60000,
                    cache: false,
                    success: function (response, sStatusText, jqXHR) {
                        var oError = _this.oClient.HandleError(response, sStatusText, jqXHR);
                        if (oError || !response) {
                            if (!oError) {
                                oError = {
                                    ClientErrorCode: SDK.Constants.ErrorCodes.ServerRejected,
                                    ClientErrorConstant: SDK.Constants.ErrorCodes[SDK.Constants.ErrorCodes.ServerRejected],
                                    Error: "Server returned failure without reason.",
                                    HttpErrorCode: -1,
                                    ErrorDetails: ""
                                };
                            }
                            onFailure(oError);
                            return;
                        }
                        onSuccess();
                    },
                    error: function (jqXHR, sStatusText, sResponse) {
                        _this.oClient.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
                    }
                });
            };
            WidgetController.prototype.validateEmail = function (sEmail) {
                // from: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
                var oRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return oRegEx.test(sEmail);
            };
            return WidgetController;
        })();
        SDK.WidgetController = WidgetController;
    })(SDK = MeetingMole.SDK || (MeetingMole.SDK = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=WidgetController.js.map