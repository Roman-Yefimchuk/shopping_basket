"use strict";

(function (require) {

    var port = 8080;
    var app = require('./app')(port);
    var server = require('http').Server(app);

    var getErrorHandler = function (port) {

        return function (error) {

            if (error.syscall !== 'listen') {
                throw error;
            }

            var bind = typeof port == 'string' ? 'Pipe ' + port : 'Port ' + port;

            switch (error.code) {
                case 'EACCES':
                {
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                }
                case 'EADDRINUSE':
                {
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                }
                default:
                    throw error;
            }
        };
    };

    var getListeningHandler = function (server) {

        return function () {

            var address = server.address();
            var bind = typeof address == 'string' ? 'pipe ' + address : 'port ' + address.port;

            console.info('Listening on ' + bind);
        };
    };

    server.listen(port);
    server.on('error', getErrorHandler(port));
    server.on('listening', getListeningHandler(server));

})(require);