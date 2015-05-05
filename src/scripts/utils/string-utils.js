/**
 * Created by Roman on 5/5/2015.
 */

"use strict";

(function () {

    function format(s, args) {

        if (typeof args != 'object') {
            return s;
        }

        var value = s;
        for (var key in args) {
            if (args[key] != undefined && args.hasOwnProperty(key)) {
                var pattern = new RegExp('@{' + key + '}', 'g');
                value = value.replace(pattern, args[key]);
            }
        }

        return String(value);
    }

    function replaceAll(s, searchValue, replaceValue) {
        var pattern = new RegExp(searchValue, 'g');
        return s.replace(pattern, replaceValue);
    }

    function startWith(s, prefix) {
        if (s.length >= prefix.length) {
            return s.substr(0, prefix.length) == prefix;
        }
        return false;
    }

    function endWith(s, suffix) {
        if (s.length >= suffix.length) {
            return s.substr(s.length - suffix.length, s.length) == suffix;
        }
        return false;
    }

    String.prototype.format = function (args) {
        return format(this, args);
    };
    String.prototype.replaceAll = function (searchValue, replaceValue) {
        return replaceAll(this, searchValue, replaceValue);
    };
    String.prototype.startWith = function (prefix) {
        return startWith(this, prefix);
    };
    String.prototype.endWith = function (suffix) {
        return endWith(this, suffix);
    };

})();