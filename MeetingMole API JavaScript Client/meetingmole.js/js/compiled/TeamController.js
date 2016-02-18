"use strict";
var MeetingMole;
(function (MeetingMole) {
    var SDK;
    (function (SDK) {
        /**
         * Handler for the Teams API. These actions require client login first.
         */
        var TeamController = (function () {
            /**
             * Constructs new Teams API handler.
             * @param oClient - Client to use for the service.
             */
            function TeamController(oClient) {
                this.oClient = null;
                this.oClient = oClient;
            }
            /**
             * Gets all teams the current user has access to.
             */
            TeamController.prototype.GetAll = function (onSuccess, onFailure) {
                var _this = this;
                $.ajax({
                    url: this.oClient.ServerURL() + SDK.Constants.TeamsAPIURLs.GetAll,
                    data: {
                        Authentication: this.oClient.Authentication()
                    },
                    method: "post",
                    timeout: 30000,
                    cache: false,
                    success: function (response, sStatusText, jqXHR) {
                        var oError = _this.oClient.HandleError(response, sStatusText, jqXHR);
                        if (oError) {
                            onFailure(oError);
                            return;
                        }
                        onSuccess(response.Teams);
                    },
                    error: function (jqXHR, sStatusText, sResponse) {
                        _this.oClient.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
                    }
                });
            };
            /**
             * Gets a team by ID.
             */
            TeamController.prototype.Get = function (iTeamID, onSuccess, onFailure) {
                var _this = this;
                $.ajax({
                    url: this.oClient.ServerURL() + SDK.Constants.TeamsAPIURLs.Get,
                    data: {
                        Authentication: this.oClient.Authentication()
                    },
                    method: "post",
                    timeout: 30000,
                    cache: false,
                    success: function (response, sStatusText, jqXHR) {
                        var oError = _this.oClient.HandleError(response, sStatusText, jqXHR);
                        if (oError) {
                            onFailure(oError);
                            return;
                        }
                        onSuccess(response);
                    },
                    error: function (jqXHR, sStatusText, sResponse) {
                        _this.oClient.HandleProtocolError(sResponse, sStatusText, jqXHR, onFailure);
                    }
                });
            };
            return TeamController;
        })();
        SDK.TeamController = TeamController;
    })(SDK = MeetingMole.SDK || (MeetingMole.SDK = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=TeamController.js.map