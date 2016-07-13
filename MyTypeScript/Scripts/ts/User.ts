/// <reference path="../Typings/index.d.ts" />
export default class User {
    public AccountName: string;
    public DisplayName: string;
    public Email: string;

    constructor() {
        return this.getUserDetails();
    }

    private getUserDetails() {
        let deferred = $.Deferred();

        let ajaxSettings: JQueryAjaxSettings = {
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
            headers: { "Accept": "application/json;odata=nometadata", "X-RequestDigest": $("#__REQUESTDIGEST").val() },
            error: function (xhr, status, error) { deferred.reject(error) },
            success: function (data) { deferred.resolve(data); }
        };

        $.ajax(ajaxSettings);

        return deferred.promise();
    }
}