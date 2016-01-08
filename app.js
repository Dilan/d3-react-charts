var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

require('./routes')(app);

app.use(express.static(__dirname + '/public'));
app.set('port', 3100);

/* Socket.io */
var io = require('socket.io').listen(server);
io.sockets.on('connection', require('./routes/socket.js'));

/* Start server */
server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
