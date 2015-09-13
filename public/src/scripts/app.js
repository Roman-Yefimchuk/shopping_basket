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

            // config application's routs

            $routeProvider
                .when('/', {
                    templateUrl: '/public/src/views/controllers/shopping-basket-view.html',
                    controller: 'ShoppingBasketController',
                    reloadOnSearch: false,
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
                    templateUrl: '/public/src/views/controllers/page-not-found-view.html',
                    controller: 'NotFoundController'
                });
        }
    ]);
