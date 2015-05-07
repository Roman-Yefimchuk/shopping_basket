/**
 * Created by Roman on 5/5/2015.
 */

/* basic filter for formatting price */

"use strict";

angular.module('shoppingBasketApp')

    .filter("price", [

        function () {

            return function (amount) {
                return '$ ' + (amount || 0).toFixed(2);
            };
        }
    ]);