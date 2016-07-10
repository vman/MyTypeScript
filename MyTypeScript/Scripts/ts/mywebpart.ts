/// <reference path="../Typings/index.d.ts" />

class User {
    public AccountName: string;
    public DisplayName: string;
    public Email: string;

    

    constructor() {
        this.getUserDetails();
    }


    private getUserDetails() {

        $.getJSON(_spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", function (data) {
            console.log(data);
        });
    }
}

$(document).ready(function () {
    let user = new User();
    alert(user.AccountName);
});