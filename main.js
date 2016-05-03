var logger = require('log4js').getLogger;
var config = require('./config/');

/*
var configuration = function() {
    var basePath = __dirname;
    var config = require(basePath + '/config/');
    var resolveModulePath = require('./config/local.modules')(basePath).resolve;
    var configuration = {
        config: config,
        basePath: basePath,
        now: function() { return new Date(); },
        mediator: new (require('events').EventEmitter)(),
        modulesManager: {
            cachedModules: {},
            get: function(moduleName) {
                if (typeof this.cachedModules[moduleName] === 'undefined') {
                    var resolvedModule = resolveModulePath(moduleName);
                    var m = (typeof resolvedModule === 'string' ? require(resolvedModule) : resolvedModule);
                    this.cachedModules[moduleName] = (typeof m === 'function' ? m(configuration) : m);
                }
                return this.cachedModules[moduleName];
            }
        },
        logger: require('log4js').getLogger
    };

    return configuration;
};
*/

var express = function() {
    var app = require('express')();

    if (config.get('env') !== 'production') {
        app.set('json replacer', null);
        app.set('json spaces', 4);
    }

    // middleware
    app.use(require('express').static(__dirname + '/public'));
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(function(req, res, next) {
        logger('[trace]').info(
            '[%s %s]' + (req.method !== 'GET' ? ' %j' : ''),
            req.method,
            require('querystring').unescape(req.url),
            (req.method !== 'GET') ? req.body : ''
        );
        next();
    });

    // routes
    require('./routes/')(app);

    // error handlers
    app.use(function(err, req, res) {
        console.log(err);
        res.status(500).json({ message: err.message, error: {} });
    });

    return app;
};

var server = function(app) {
    var server = require('http').createServer(app).
        on('listening', function() {
            logger().debug('Express server listening on port :' + config.get('app.port'));
        }).
        on('error', function(err) {
            logger().error(err);
        })
        .listen(config.get('app.port'));

    return server;
};

var socket = function(server) {
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', require('./routes/socket.js'));
    return io;
};

module.exports = {
    express: express,
    server: server,
    socket: socket
};

if (require.main === module) {
    //var app = express();
    //var server = server(app);
    //socket(server);

    socket(
        server(
            express()
        )
    );

}