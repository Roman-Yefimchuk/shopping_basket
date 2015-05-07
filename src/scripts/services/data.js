/**
 * Created by Roman on 5/5/2015.
 */

/* service for obtaining test data */

'use strict';

angular.module('shoppingBasketApp')

    .service('dataService', [

        '$q',
        '$http',
        'apiServiceBaseUri',

        function ($q, $http, apiServiceBaseUri) {

            // generic function for obtaining json
            function getJson(name) {
                return $q(function (resolve, reject) {
                    $http.get(apiServiceBaseUri + '/data/' + name + '.json')
                        .success(function (data) {
                            resolve(data[name]);
                        })
                        .error(function (error) {
                            reject(error);
                        });
                });
            }

            // obtain categories
            function getCategories() {
                return getJson('categories');
            }

            // obtain galleries
            function getGalleries() {
                return getJson('galleries');
            }

            // obtain products
            function getProducts() {
                return getJson('products');
            }

            // export functions
            return {
                getCategories: getCategories,
                getGalleries: getGalleries,
                getProducts: getProducts
            };
        }
    ]);