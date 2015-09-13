/**
 * Created by Roman on 6/5/2015.
 */

"use strict";

angular.module('shoppingBasketApp')

    .directive('categoriesFilter', [

        '$routeParams',
        '$location',
        '$rootScope',

        function ($routeParams, $location, $rootScope) {
            return {
                templateUrl: '/public/src/views/directives/categories-filter-view.html',
                scope: {
                    categories: '=categoriesFilter'
                },
                controller: [

                    '$scope',

                    function ($scope) {

                        // read categoryId from route params
                        var categoryId = $routeParams.categoryId;

                        function changeCategory(category) {

                            // update current category
                            $scope.currentCategory = category;

                            // update route params
                            $location.search('categoryId', category.id);

                            // notify child scopes about changing category filter
                            $rootScope.$broadcast('categoriesFilter:categoryChanged', category.id);
                        }

                        // if categoryId defined find category by categoryId...
                        if (categoryId) {
                            $scope.currentCategory = _.findWhere($scope.categories, {
                                id: categoryId
                            });
                        } else {
                            // ...else define empty property
                            $scope.currentCategory = null;
                        }

                        // export function to scope
                        $scope.changeCategory = changeCategory;
                    }
                ]
            };
        }
    ]
);