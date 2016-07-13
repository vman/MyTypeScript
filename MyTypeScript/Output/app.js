(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
/// <reference path="../Typings/index.d.ts" />
var User_1 = require("./User");
$(document).ready(function () {
    var user = new User_1.default();
    alert(user.AccountName);
});

},{"./User":1}]},{},[2]);
