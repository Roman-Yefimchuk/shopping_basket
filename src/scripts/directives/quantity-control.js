/**
 * Created by Roman on 6/5/2015.
 */

"use strict";

angular.module('shoppingBasketApp')

    .directive('quantityControl', [

        function () {
            return {
                replace: true,
                templateUrl: 'src/views/directives/quantity-control-view.html',
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
                            $scope.onIncreaseQuantity({
                                product: $scope.product
                            });
                        }

                        function decreaseQuantity() {
                            $scope.onDecreaseQuantity({
                                product: $scope.product
                            });
                        }

                        $scope.increaseQuantity = increaseQuantity;
                        $scope.decreaseQuantity = decreaseQuantity;
                    }
                ]
            };
        }
    ]
);