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
                templateUrl: 'src/views/directives/sort-filter-view.html',
                scope: {},
                controller: [

                    '$scope',

                    function ($scope) {

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
                                $location.search('sortFilterType', type);
                            } else {
                                $location.search('sortFilterType', null);
                            }

                            $rootScope.$broadcast('sortFilter:filterChanged', type);
                        }

                        $scope.filters = filters;
                        $scope.sortFilter = _.findWhere(filters, {
                            type: $routeParams.sortFilterType || 'none'
                        });

                        $scope.changeFilter = changeFilter;
                    }
                ]
            };
        }
    ]
);