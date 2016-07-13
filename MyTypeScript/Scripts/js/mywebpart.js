"use strict";
/// <reference path="../Typings/index.d.ts" />
var User_1 = require("./User");
$(document).ready(function () {
    var user = new User_1.default();
    alert(user.AccountName);
});
