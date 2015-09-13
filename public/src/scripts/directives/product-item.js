/**
 * Created by Roman on 6/5/2015.
 */

"use strict";

angular.module('shoppingBasketApp')

    .directive('productItem', [

        function () {
            return {
                templateUrl: '/public/src/views/directives/product-item-view.html',
                scope: {
                    selectedProducts: '=',
                    category: '=',
                    gallery: '=',
                    product: '=productItem'
                },
                controller: [

                    '$scope',

                    function ($scope) {

                        function increaseQuantity() {

                            if (getQuantity() < $scope.availableQuantity) {
                                $scope.quantity++;
                                return true;
                            }

                            return false;
                        }

                        function decreaseQuantity() {

                            if (getQuantity() > 0) {
                                $scope.quantity--;
                                return true;
                            }

                            return false;
                        }

                        function getQuantity() {
                            return $scope.quantity;
                        }

                        function addProductToBasket(productId, quantity) {

                            // check quantity
                            if (quantity > 0) {

                                var selectedProducts = $scope.selectedProducts;

                                // find selected product
                                var selectedProduct = _.findWhere(selectedProducts, {
                                    id: productId
                                });

                                // if selected product already defined increase quantity...
                                if (selectedProduct) {
                                    selectedProduct.quantity += quantity;
                                } else {
                                    // ...else define selected product with given quantity
                                    selectedProducts.push({
                                        id: productId,
                                        quantity: quantity,
                                        title: $scope.product['title'],
                                        price: $scope.product['price']
                                    });
                                }

                                $scope.quantity = 0;
                            }
                        }

                        // define scope's properties
                        $scope.quantity = 0;
                        $scope.availableQuantity = $scope.product['quantity'];

                        // export local functions to scope
                        $scope.addProductToBasket = addProductToBasket;
                        $scope.increaseQuantity = increaseQuantity;
                        $scope.decreaseQuantity = decreaseQuantity;

                        $scope.$watch('selectedProducts', function (selectedProducts) {

                            var selectedProduct = _.findWhere(selectedProducts, {
                                id: $scope.product['id']
                            });

                            if (selectedProduct) {
                                $scope.availableQuantity = $scope.product['quantity'] - selectedProduct.quantity;
                                if ($scope.quantity > $scope.availableQuantity) {
                                    $scope.quantity = $scope.availableQuantity;
                                }
                            } else {
                                $scope.availableQuantity = $scope.product['quantity'];
                            }

                        }, true);
                    }
                ]
            };
        }
    ]
);