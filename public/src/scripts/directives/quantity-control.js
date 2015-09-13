/**
 * Created by Roman on 6/5/2015.
 */

"use strict";

angular.module('shoppingBasketApp')

    .directive('quantityControl', [

        function () {
            return {
                replace: true,
                templateUrl: '/public/src/views/directives/quantity-control-view.html',
                scope: {
                    isDisabled: '=',
                    product: '=quantityControl',
                    onIncreaseQuantity: '&',
                    onDecreaseQuantity: '&',
                    quantity: '='
                },
                controller: [

                    '$scope',

                    function ($scope) {

                        function increaseQuantity() {
                            // calculate quantity on increase action
                            $scope.onIncreaseQuantity({
                                product: $scope.product
                            });
                        }

                        function decreaseQuantity() {
                            // calculate quantity on decrease action
                            $scope.onDecreaseQuantity({
                                product: $scope.product
                            });
                        }

                        // export functions to scope
                        $scope.increaseQuantity = increaseQuantity;
                        $scope.decreaseQuantity = decreaseQuantity;
                    }
                ]
            };
        }
    ]
);