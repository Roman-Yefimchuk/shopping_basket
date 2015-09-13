(function (require) {

    var ResourcesManager = require('./../utils/resources-manager');

    module.exports = function (controller) {
        return controller({
            routePrefix: '/galleries',
            actions: [
                {
                    handler: function () {
                        return ResourcesManager.getJsonAsync('/data/galleries.json');
                    }
                }
            ]
        });
    };

})(require);