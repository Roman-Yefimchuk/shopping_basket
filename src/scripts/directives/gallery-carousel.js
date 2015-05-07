/**
 * Created by Roman on 7/5/2015.
 */

"use strict";

angular.module('shoppingBasketApp')

    .directive('galleryCarousel', [

        function () {
            return {
                templateUrl: 'src/views/directives/gallery-carousel-view.html',
                scope: {
                    gallery: '=galleryCarousel'
                },
                controller: [

                    '$scope',

                    function ($scope) {

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
                        $scope.thumbnailsOffset = 0;
                        $scope.mainThumbnail = $scope.images[0];
                        $scope.visibleThumbnails = getVisibleThumbnails();

                        // export local functions to scope
                        $scope.setMainThumbnail = setMainThumbnail;
                        $scope.scrollLeft = scrollLeft;
                        $scope.scrollRight = scrollRight;
                    }
                ]
            };
        }
    ]
);