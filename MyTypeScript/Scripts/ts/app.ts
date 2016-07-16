import * as $ from "jquery";
import User from "./User";

$(document).ready(() => {

    // Create an object of the User class
    let user = new User();

    // Get user details
    user.getDetails().then(() => {

        // Display user details
        user.displayDetails();

    });

});