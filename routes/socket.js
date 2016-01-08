module.exports = function (socket) {

    // Twitter
    var env = require('node-env-file');

    var envPath = __dirname + '/../config/production.env';
    if (require('fs').existsSync(__dirname + '/../config/development.env')) {
        envPath = __dirname + '/../config/development.env';
    }

    env(envPath); // load ENV variables
    var Twitter = require('twitter');
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    client.stream('statuses/filter', { track: 'javascript' }, function(stream) {
        stream.on('data', function(tweet) {
            // console.log(tweet.text);
            socket.emit(
                'tweet:new',
                tweet.text
            );
        });

        stream.on('error', function(error) {
            throw error;
        });
    });

    // emulate USD/EUR change each 2 seconds:
    setInterval(function() {
        var randomInterval = function(min, max) {
            return parseFloat(Math.random() * (max - min + 1) + min).toFixed(2);
        };
        socket.emit(
            'usd:change',
            randomInterval(70, 80)
        );
        socket.emit(
            'eur:change',
            randomInterval(80, 89)
        );
    }, 2000)

    socket.on('disconnect', function () { });
};
