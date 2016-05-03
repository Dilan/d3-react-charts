var config = require('../config/');

module.exports = function(options, callback) {
    return function() {
        var Twitter = require('twitter');
        var client = new Twitter({
            consumer_key: config.get('twitter.CONSUMER_KEY'),
            consumer_secret: config.get('twitter.CONSUMER_SECRET'),
            access_token_key: config.get('twitter.ACCESS_TOKEN_KEY'),
            access_token_secret: config.get('twitter.ACCESS_TOKEN_SECRET')
        });
        client.stream('statuses/filter', options, callback);
    }
};
