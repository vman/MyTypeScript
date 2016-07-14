import * as $ from "jquery";
import User from "./User";

$(document).ready(function () {

    let user = new User();

    user.getUserDetails().done(function () {
        console.log(user.AccountName);
    });
});