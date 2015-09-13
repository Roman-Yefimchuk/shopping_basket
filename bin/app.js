(function (require, module) {

    var express = require('express');
    var path = require('path');
    var domain = require('domain');
    var debug = require('debug')('FellowTraveler:server');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var _ = require('underscore');
    var fileSystem = require('fs');

    var publicDirectory = path.resolve('./public');

    function acceptTypeDetector(request, handler) {

        if (request.accepts('text/html')) {
            handler.html();
        } else {
            if (request.accepts('application/json')) {
                handler.json();
            } else {
                handler.unknown();
            }
        }
    }

    function initControllers(app) {

        var controller = require('./controller')(app);
        var files = [];

        function loadFiles(path) {
            var names = fileSystem.readdirSync(path);
            _.forEach(names, function (name) {
                files.push({
                    name: name,
                    path: path
                });
            });
        }

        loadFiles('./bin/controllers');

        do {

            _.forEach(files, function (file) {

                var fileName = file.name;
                var filePath = file.path;

                var stats = fileSystem.statSync(filePath + '/' + fileName);
                if (stats.isDirectory()) {
                    loadFiles(filePath + '/' + file.name);
                    files = _.without(files, file);
                } else {
                    if (/^.*-controller.js$/.test(fileName)) {
                        require('.' + filePath + '/' + fileName)(controller);
                        files = _.without(files, file);
                        console.info("Controller [." + filePath + '/' + fileName + "] successfully initialized");
                    }
                }
            });

        } while (files.length > 0);
    }

    function getApp(config) {

        var app = express();

        app.use(function (request, response, next) {

            var d = domain.create();

            d.add(request);
            d.add(response);

            d.on('error', function (error) {

                next(error);

                if (d) {
                    d.dispose();
                }
            });

            d.run(function () {
                next();
            });
        });

        if (config.debug) {
            app.use(logger('dev'));
        }

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(cookieParser());
        app.use('/public', (function () {
            return express.static(publicDirectory);
        })());

        initControllers(app);

        app.get('/', function (request, response) {
            response.sendFile(publicDirectory + '/index.html');
        });

        app.use(function (request, response, next) {

            response.status(404);

            var url = decodeURIComponent(request.url);

            acceptTypeDetector(request, {
                html: function () {
                    response.render('page-not-found.ejs', {
                        requestUrl: url
                    });
                },
                json: function () {
                    response.send(JSON.stringify({
                        error: {
                            message: 'Page ' + url + ' not found'
                        }
                    }));
                },
                unknown: function () {
                    response = response.type('txt');
                    response.send('Page ' + url + ' not found');
                }
            });
        });
        app.use(function (error, request, response, next) {

            console.error(error.stack);

            response.status(error.status || 500);

            function extractErrorMessage(error) {

                if (error instanceof Error) {
                    return error;
                }

                return new Error((error.message || error) || 'Internal Server Error');
            }

            acceptTypeDetector(request, {
                html: function () {
                    response.render('internal-server-error.ejs', {
                        error: extractErrorMessage(error)
                    });
                },
                json: function () {
                    response.send(JSON.stringify({
                        error: extractErrorMessage(error)
                    }));
                },
                unknown: function () {
                    var message = extractErrorMessage(error).message;
                    response = response.type('txt');
                    response.send(message);
                }
            });
        });

        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'ejs');
        app.set('port', config.port);

        return app;
    }

    module.exports = function (config) {
        return getApp(config);
    };

})(require, module);