import * as $ from "jquery";

export default class User {
    public AccountName: string;
    public DisplayName: string;
    public Email: string;

    constructor() {

    }

    public getUserDetails() {

        let deferred = $.Deferred();

        let ajaxSettings: JQueryAjaxSettings = {
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties?$select=AccountName,DisplayName,Email",
            headers: { "Accept": "application/json;odata=nometadata", "X-RequestDigest": $("#__REQUESTDIGEST").val() },
            error: function (xhr, status, error) { deferred.reject(error); },
            success: (data) => {

                this.AccountName = data.AccountName;
                this.DisplayName = data.DisplayName;
                this.Email = data.Email;

                deferred.resolve(data);
            }
        };

        $.ajax(ajaxSettings);

        return deferred.promise();
    }
}