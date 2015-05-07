/**
 * Created by Roman on 6/5/2015.
 */

"use strict";

angular.module('shoppingBasketApp')

    .directive('productItem', [

        function () {
            return {
                templateUrl: 'src/views/directives/product-item-view.html',
                scope: {
                    selectedProducts: '=',
                    category: '=',
                    gallery: '=',
                    product: '=productItem'
                },
                controller: [

                    '$scope',

                    function ($scope) {

                        function increaseQuantity(product) {

                            if (getQuantity() < product.quantity) {
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

                        function scrollLeft() {

                            var images = $scope.images;
                            if (images.length <= 3) {
                                return;
                            }

                            // if index equal zero - move it to tail...
                            if ($scope.thumbnailsOffset == 0) {
                                $scope.thumbnailsOffset = images.length - 1;
                            } else {
                                // ...else decrease index value
                                $scope.thumbnailsOffset--;
                            }

                            // update thumbnails
                            $scope.visibleThumbnails = getVisibleThumbnails();
                        }

                        function scrollRight() {

                            var images = $scope.images;
                            if (images.length <= 3) {
                                return;
                            }

                            // if index equal images count - move it to head...
                            if ($scope.thumbnailsOffset == images.length - 1) {
                                $scope.thumbnailsOffset = 0;
                            } else {
                                // ...else increase index value
                                $scope.thumbnailsOffset++;
                            }

                            // update thumbnails
                            $scope.visibleThumbnails = getVisibleThumbnails();
                        }

                        function getVisibleThumbnails() {

                            var images = $scope.gallery['images'];
                            if (images.length > 3) {

                                // calculate index
                                var getIndex = function (offset) {
                                    if ($scope.thumbnailsOffset + offset < images.length) {
                                        return $scope.thumbnailsOffset + offset;
                                    }
                                    return Math.abs(images.length - ($scope.thumbnailsOffset + offset));
                                };

                                return [
                                    images[$scope.thumbnailsOffset],
                                    images[getIndex(1)],
                                    images[getIndex(2)]
                                ];

                            } else {
                                return images;
                            }
                        }

                        function setMainThumbnail(thumbnail) {
                            // update main thumbnail
                            $scope.mainThumbnail = thumbnail;
                        }

                        // define scope's properties
                        $scope.images = $scope.gallery['images'];
                        $scope.quantity = 0;
                        $scope.thumbnailsOffset = 0;
                        $scope.mainThumbnail = $scope.images[0];
                        $scope.visibleThumbnails = getVisibleThumbnails();

                        // export local functions to scope
                        $scope.addProductToBasket = addProductToBasket;
                        $scope.increaseQuantity = increaseQuantity;
                        $scope.decreaseQuantity = decreaseQuantity;
                        $scope.getQuantity = getQuantity;
                        $scope.setMainThumbnail = setMainThumbnail;
                        $scope.scrollLeft = scrollLeft;
                        $scope.scrollRight = scrollRight;
                    }
                ]
            };
        }
    ]
);