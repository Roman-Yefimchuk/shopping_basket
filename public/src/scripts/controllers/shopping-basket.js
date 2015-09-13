/**
 * Created by Roman on 5/5/2015.
 */

'use strict';

angular.module('shoppingBasketApp')

    .controller('ShoppingBasketController', [

        '$scope',
        '$cookieStore',
        '$routeParams',
        'categories',
        'galleries',
        'products',

        function ($scope, $cookieStore, $routeParams, categories, galleries, products) {

            var currentCategoryId = $routeParams.categoryId;
            var currentSortFilterType = $routeParams.sortFilterType;

            function getMappedObject(keyName, collection) {
                var mappedObject = {};
                _.forEach(collection, function (item) {
                    mappedObject[item[keyName]] = item;
                });
                return mappedObject;
            }

            function getProducts() {

                var filteredProducts = products;

                if (currentCategoryId) {
                    // sort products by category
                    filteredProducts = _.filter(products, function (product) {
                        return product['category_id'] == currentCategoryId;
                    });
                }

                // sort products by sort filter
                switch (currentSortFilterType) {
                    case 'ascending_price':
                        return _.sortBy(filteredProducts, function (product) {
                            return product.price;
                        });
                    case 'descending_price':
                        return _.sortBy(filteredProducts, function (product) {
                            return -product.price;
                        });
                    default :
                        return filteredProducts;
                }
            }

            function getProductsRows() {

                var products = $scope.products;

                if (products.length > 0) {
                    var result = [];
                    if (products.length < 3) {
                        result.push([
                            products[0],
                            products[1],
                            products[2]
                        ]);
                    } else {
                        var length = Math.floor(products.length / 3) + (products.length % 3);
                        for (var index = 0; index < length; index++) {
                            result.push([
                                products[index * 3],
                                products[index * 3 + 1],
                                products[index * 3 + 2]
                            ]);
                        }
                    }
                    return result;
                }

                return [];
            }

            function increaseQuantity(selectedProduct) {

                var product = _.findWhere(products, {
                    id: selectedProduct.id
                });

                if (product && selectedProduct.quantity < product.quantity) {
                    selectedProduct.quantity++;
                }
            }

            function decreaseQuantity(selectedProduct) {

                var product = _.findWhere(products, {
                    id: selectedProduct.id
                });

                if (product) {
                    if (selectedProduct.quantity - 1 == 0) {
                        $scope.selectedProducts = _.without($scope.selectedProducts, selectedProduct);
                    } else {
                        selectedProduct.quantity--;
                    }
                }
            }

            $scope.categories = getMappedObject('id', categories);
            $scope.galleries = getMappedObject('id', galleries);
            $scope.products = getProducts();
            $scope.productsRows = getProductsRows();
            $scope.totalPrice = 0;

            $scope.selectedProducts = (function () {

                // restore selected products from local storage
                var selectedProducts = $cookieStore.get('selectedProducts');
                if (selectedProducts) {

                    _.forEach(selectedProducts, function (selectedProduct) {

                        var product = _.findWhere(products, {
                            id: selectedProduct.id
                        });

                        selectedProduct.title = product.title;
                        selectedProduct.price = product.price;
                    });

                    return selectedProducts;
                }
            })() || [];

            $scope.increaseQuantity = increaseQuantity;
            $scope.decreaseQuantity = decreaseQuantity;

            $scope.$on('categoriesFilter:categoryChanged', function (event, categoryId) {
                // handle category change event
                currentCategoryId = categoryId;
                $scope.products = getProducts();
                $scope.productsRows = getProductsRows();
            });

            $scope.$on('sortFilter:filterChanged', function (event, sortFilterType) {
                // handle sort filter change event
                currentSortFilterType = sortFilterType;
                $scope.products = getProducts();
                $scope.productsRows = getProductsRows();
            });

            // after changed selected products update total price and store products
            $scope.$watch('selectedProducts', function (selectedProducts) {

                if (selectedProducts.length > 0) {
                    $cookieStore.put('selectedProducts', (function () {

                        var totalPrice = 0;
                        var products = [];

                        _.forEach(selectedProducts, function (selectedProduct) {
                            totalPrice += selectedProduct.price * selectedProduct.quantity;
                            products.push({
                                id: selectedProduct.id,
                                quantity: selectedProduct.quantity
                            });
                        });

                        $scope.totalPrice = totalPrice;

                        return products;
                    })());
                } else {
                    $scope.totalPrice = 0;
                    $cookieStore.remove('selectedProducts');
                }
            }, true);
        }
    ]);