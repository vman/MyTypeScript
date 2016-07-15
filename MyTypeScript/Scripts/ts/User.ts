import * as $ from "jquery";

export default class User {
    public AccountName: string;
    public DisplayName: string;
    public Email: string;

    private _userName: string;

    constructor(username: string) {
        this._userName = username;
    }

    public getUserDetails() {

        let deferred = $.Deferred();

        let ajaxSettings: JQueryAjaxSettings = {
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent(this._userName) + "'&select=AccountName,DisplayName,Email",
            headers: { "Accept": "application/json;odata=nometadata" },
            error: (xhr, status, error) => { deferred.reject(error); },
            success: (data) => {

                this.AccountName = data.AccountName;
                this.DisplayName = data.DisplayName;
                this.Email = data.Email;

                deferred.resolve();
            }
        };

        $.ajax(ajaxSettings);

        return deferred.promise();
    }

    public displayUserDetails() {

        console.log(this.AccountName);
        console.log(this.DisplayName);
        console.log(this.Email);

    }
}