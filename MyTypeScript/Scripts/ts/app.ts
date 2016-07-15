import * as $ from "jquery";
import User from "./User";

$(document).ready(() => {

    let user = new User("i:0#.f|membership|ccdev2@murphyccdev.onmicrosoft.com");

    user.getUserDetails().then(() => {

        user.displayUserDetails();

    });

});