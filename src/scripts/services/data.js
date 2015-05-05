/**
 * Created by Roman on 5/5/2015.
 */

'use strict';

angular.module('shoppingBasketApp')

    .service('dataService', [

        '$q',
        '$http',
        'apiServiceBaseUri',

        function ($q, $http, apiServiceBaseUri) {

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

            function getCategories() {
                return getJson('categories');
            }

            function getGalleries() {
                return getJson('galleries');
            }

            function getProducts() {
                return getJson('products');
            }

            return {
                getCategories: getCategories,
                getGalleries: getGalleries,
                getProducts: getProducts
            };
        }
    ]);