/**
 * Created by Roman on 5/5/2015.
 */

"use strict";

angular.module('shoppingBasketApp')

    .controller('NotFoundController', [

        '$scope',
        '$location',

        function ($scope, $location) {
            $scope.requestUrl = $location.path();
        }
    ]
);
