import * as $ from "jquery";

export default class User {
    AccountName: string;
    DisplayName: string;
    Email: string;

    getDetails() {

        let deferred = $.Deferred();

        let ajaxSettings: JQueryAjaxSettings = {
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties?$select=AccountName,DisplayName,Email",
            headers: { "Accept": "application/json;odata=nometadata" },
            error: (xhr, status, error) => { deferred.reject(error); },
            success: (data) => {

                /* Since we have used the => lambda syntax to create this function,
                the 'this' variable refers to the current instance of the User class even in the context of the success handler */
                this.AccountName = data.AccountName;
                this.DisplayName = data.DisplayName;
                this.Email = data.Email;

                deferred.resolve();
            }
        };

        $.ajax(ajaxSettings);

        return deferred.promise();
    }

    displayDetails() {

        console.log(this.AccountName);
        console.log(this.DisplayName);
        console.log(this.Email);
    }
}