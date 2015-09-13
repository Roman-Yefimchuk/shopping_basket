"use strict";

(function (require) {

    var Promise = require('q')['promise'];
    var FileSystem = require("fs");
    var path = require('path');

    var resourcesDirectory = path.join(__dirname, '../../resources');

    module.exports = {
        getJson: function (fileName) {
            var json = this.getResourceAsString(fileName);
            return JSON.parse(json);
        },
        getJsonAsync: function (fileName) {

            var context = this;

            return Promise(function (resolve, reject) {

                context.getResourceAsStringAsync(fileName)
                    .then(function (json) {
                        resolve(JSON.parse(json));
                    }, function (reason) {
                        reject(reason);
                    });
            });
        },
        getResourceAsStringAsync: function (fileName) {

            return Promise(function (resolve, reject) {

                FileSystem.readFile(resourcesDirectory + '/' + fileName, "utf8", function (error, file) {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(file);
                    }
                });
            });
        },
        getResourceAsString: function (fileName) {
            return FileSystem.readFileSync(resourcesDirectory + '/' + fileName, "utf8");
        }
    };

})(require);