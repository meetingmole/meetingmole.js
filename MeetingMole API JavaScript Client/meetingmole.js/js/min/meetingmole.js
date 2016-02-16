/*
 * MeetingMole API JavaScript Client v1.0.2
 * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.
 * More info, documentation and source: https://github.com/meetingmole/meetingmole.js
*/
"use strict";var MeetingMole;!function(a){var b;!function(b){function c(){f=$("#btnPing"),e=$("#divResponseDisplay"),g=$("#txServerURL"),g.off("change").on("change",function(){h&&(h.Dispose(),h=null);var b=g.val().trim();h=b?new a.JSClient(b):null}),g.val("http://localhost:56936").trigger("change"),f.off("click").on("click",function(){return h?(d("Pinging "+h.ServerURL()+"..."),void h.Ping(function(a){d("Ping success!",i.Success),d(JSON.stringify(a),i.Indent)},function(a){d("Ping failed."),d("Error: "+JSON.stringify(a),i.Error)})):void d("Not connected to server. Please define server URL to connect to.",i.Error)})}function d(a,b){if(void 0===b&&(b=i.Normal),a){var c=i[b].toLowerCase();e.append("<div class='log-"+c+"'>"+a+"</div>")}}var e=null,f=null,g=null,h=null;b.Init=c;var i;!function(a){a[a.Normal=0]="Normal",a[a.Error=1]="Error",a[a.Success=2]="Success",a[a.Indent=3]="Indent"}(i||(i={}))}(b=a.JSClientTest||(a.JSClientTest={}))}(MeetingMole||(MeetingMole={}));var MeetingMole;!function(a){var b;!function(a){a.BaseURL="/publicapi/v1/",a.APIURLs={SimpleLogin:"access/simplelogin",About:"access/about",CheckToken:"access/simplelogin",Logout:"access/logout"}}(b=a.Constants||(a.Constants={}))}(MeetingMole||(MeetingMole={}));var MeetingMole;!function(a){var b=function(){function b(b){if(this.sServerURL=null,this.sUsername=null,this.bIsConnected=!1,!b)throw"Parameter sServerURL must be defined.";if(b=b.trim(),0!==b.indexOf("http://")&&0!==b.indexOf("https://"))throw"Parameter sServerURL must start with authority (http:// or https://).";"/"===b[b.length-1]&&(b=b.substring(0,b.length-1)),this.sServerURL=b+a.Constants.BaseURL}return b.prototype.Version=function(){return"1.0.2"},b.prototype.ServerURL=function(){return this.sServerURL},b.prototype.Username=function(){return this.bIsConnected?this.sUsername:null},b.prototype.IsConnected=function(){return this.bIsConnected},b.prototype.Dispose=function(){this.IsConnected()&&this.Logout(function(){},function(){}),this.sServerURL=null},b.prototype.Ping=function(b,c){var d=this;$.ajax({url:this.sServerURL+a.Constants.APIURLs.About,method:"get",timeout:3e4,cache:!1,success:function(a,e,f){var g=d.handleError(a);return g?void c(g):void b(a)},error:function(a,b,e){var f=d.handleProtocolError(a);c(f)}})},b.prototype.Logout=function(b,c){var d=this;this.IsConnected()&&$.ajax({url:a.Constants.BaseURL+a.Constants.APIURLs.Logout,method:"post",timeout:3e4,cache:!1,success:function(a){var e=d.handleError(a);return e?void c(e):(d.sUsername=null,d.bIsConnected=!1,void b(a))},error:function(a){var b=d.handleProtocolError(a);c(b)}})},b.prototype.Login=function(b,c,d,e){var f=this;this.IsConnected()||$.ajax({url:a.Constants.BaseURL+a.Constants.APIURLs.Logout,method:"post",timeout:3e4,cache:!1,success:function(a,c,g){console.log(g);var h=f.handleError(a);return h?void e(h):(f.sUsername=b,f.bIsConnected=!1,void d(a))},error:function(a,b,c){console.log(b),console.log(c);var d=f.handleProtocolError(a);e(d)}})},b.prototype.handleError=function(a){return a?a.error?a.error:null:{HttpErrorCode:400,Error:"No response received from server",ErrorDetails:""}},b.prototype.handleProtocolError=function(a){if(!a)return{HttpErrorCode:400,Error:"Unknown error",ErrorDetails:""};console.log(a);var b=-1,c="Unknown error";return a.status>0&&(b=a.status),a.statusText&&(c=a.statusText),{HttpErrorCode:b,Error:c,ErrorDetails:"TODO:"}},b}();a.JSClient=b}(MeetingMole||(MeetingMole={}));
//# sourceMappingURL=meetingmole.js.map