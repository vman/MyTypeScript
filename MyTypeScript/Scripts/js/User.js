"use strict";
var User = (function () {
    function User() {
        this.getUserDetails();
    }
    User.prototype.getUserDetails = function () {
        $.getJSON(_spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", function (data) {
            console.log(data);
        });
    };
    return User;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
