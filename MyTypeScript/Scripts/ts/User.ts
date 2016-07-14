import * as $ from "jquery";
export default class User {
    public AccountName: string;
    public DisplayName: string;
    public Email: string;

    constructor() {

    }

    public getUserDetails() {

        let deferred = $.Deferred();
        let self = this;

        let ajaxSettings: JQueryAjaxSettings = {
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties?$select=AccountName,DisplayName,Email",
            headers: { "Accept": "application/json;odata=nometadata", "X-RequestDigest": $("#__REQUESTDIGEST").val() },
            error: function (xhr, status, error) { deferred.reject(error); },
            success: function (data) {

                self.AccountName = data.AccountName;
                self.DisplayName = data.DisplayName;
                self.Email = data.Email;

                deferred.resolve(data);
            }
        };

        $.ajax(ajaxSettings);

        return deferred.promise();
    }
}