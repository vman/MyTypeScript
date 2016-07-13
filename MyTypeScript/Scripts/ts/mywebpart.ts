/// <reference path="../Typings/index.d.ts" />
import User from "./User";

$(document).ready(function () {

    let user = new User();

    alert(user.AccountName);
});