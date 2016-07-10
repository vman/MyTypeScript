/// <reference path="../Typings/index.d.ts" />
var User = (function () {
    function User() {
        this.getUserDetails();
        this.deferred = $.Deferred();
    }
    User.prototype.getUserDetails = function () {
        $.getJSON(_spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", function (data) {
            console.log(data);
        });
    };
    return User;
}());
$(document).ready(function () {
    var user = new User();
    alert(user.AccountName);
});
