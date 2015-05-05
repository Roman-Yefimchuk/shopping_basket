/**
 * Created by Roman on 5/5/2015.
 */

'use strict';

angular
    .module('shoppingBasketApp', [

        'ngCookies',
        'ngRoute'

    ])
    .config([

        '$routeProvider',

        function ($routeProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'src/views/controllers/shopping-basket-view.html',
                    controller: 'ShoppingBasketController',
                    resolve: {
                        categories: [

                            'dataService',

                            function (dataService) {
                                return dataService.getCategories();
                            }
                        ],
                        galleries: [

                            'dataService',

                            function (dataService) {
                                return dataService.getGalleries();
                            }
                        ],
                        products: [

                            'dataService',

                            function (dataService) {
                                return dataService.getProducts();
                            }
                        ]
                    }
                })
                .otherwise({
                    templateUrl: 'src/views/controllers/page-not-found-view.html',
                    controller: 'NotFoundController'
                });
        }
    ]);