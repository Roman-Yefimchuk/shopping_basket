/**
 * Created by Roman on 6/5/2015.
 */

"use strict";

angular.module('shoppingBasketApp')

    .directive('sortFilter', [

        '$routeParams',
        '$location',
        '$rootScope',

        function ($routeParams, $location, $rootScope) {
            return {
                templateUrl: '/public/src/views/directives/sort-filter-view.html',
                scope: {},
                controller: [

                    '$scope',

                    function ($scope) {

                        // default filter modes
                        var filters = [
                            {
                                name: '-------',
                                type: 'none'
                            },
                            {
                                name: 'Ascending price',
                                type: 'ascending_price'
                            },
                            {
                                name: 'Descending price',
                                type: 'descending_price'
                            }
                        ];

                        function changeFilter() {

                            var type = $scope.sortFilter['type'];
                            if (type != 'none') {
                                // if type not equal none update params...
                                $location.search('sortFilterType', type);
                            } else {
                                // ...else remove from params
                                $location.search('sortFilterType', null);
                            }

                            // notify about sort filter changing
                            $rootScope.$broadcast('sortFilter:filterChanged', type);
                        }

                        // define scope properties
                        $scope.filters = filters;
                        $scope.sortFilter = _.findWhere(filters, {
                            type: $routeParams.sortFilterType || 'none'
                        });

                        // export function to scope
                        $scope.changeFilter = changeFilter;
                    }
                ]
            };
        }
    ]
);