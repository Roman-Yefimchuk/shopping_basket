/**
 * Created by Roman on 5/5/2015.
 */

'use strict';

angular.module('shoppingBasketApp')

    .controller('ShoppingBasketController', [

        '$scope',
        'categories',
        'galleries',
        'products',

        function ($scope, categories, galleries, products) {

            $scope.categories = categories;
            $scope.galleries = galleries;
            $scope.products = products;
        }
    ]);