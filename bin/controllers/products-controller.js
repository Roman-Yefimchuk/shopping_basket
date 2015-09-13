(function (require) {

    var ResourcesManager = require('./../utils/resources-manager');

    module.exports = function (controller) {
        return controller({
            routePrefix: '/products',
            actions: [
                {
                    handler: function () {
                        return ResourcesManager.getJsonAsync('/data/products.json');
                    }
                }
            ]
        });
    };

})(require);