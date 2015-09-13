"use strict";

(function () {

    function getToken(request) {

        var headers = request.headers || {};
        var authorization = headers.authorization;
        if (authorization) {

            var parts = authorization.split(' ');
            if (parts.length == 2) {

                var scheme = parts[0];
                var credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    return credentials;
                }
            }
        }
    }

    module.exports = {
        getToken: getToken
    };

})();