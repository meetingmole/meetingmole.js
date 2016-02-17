var MeetingMole;
(function (MeetingMole) {
    var SDK;
    (function (SDK) {
        /**
         * Handler for the Team Service API
         */
        var TeamService = (function () {
            /**
             * Constructs new team service handler.
             * @param oClient - Client to use for the service.
             */
            function TeamService(oClient) {
                this.oClient = null;
                this.oClient = oClient;
            }
            /**
             * Gets all teams the current user has access to.
             */
            TeamService.prototype.GetAll = function (onSuccess, onFailure) {
                var _this = this;
                $.ajax({
                    url: this.oClient.ServerURL() + MeetingMole.Constants.TeamAPIURLs.GetAll,
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
            return TeamService;
        })();
        SDK.TeamService = TeamService;
    })(SDK = MeetingMole.SDK || (MeetingMole.SDK = {}));
})(MeetingMole || (MeetingMole = {}));
//# sourceMappingURL=TeamService.js.map