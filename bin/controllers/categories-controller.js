(function (require) {

    var ResourcesManager = require('./../utils/resources-manager');

    module.exports = function (controller) {
        return controller({
            routePrefix: '/categories',
            actions: [
                {
                    handler: function () {
                        return ResourcesManager.getJsonAsync('/data/categories.json');
                    }
                }
            ]
        });
    };

})(require);