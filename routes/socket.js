var config = require('../config/');

var Pipeline = require('../components/pipeline');
var pipelineClient = new Pipeline();
var currencyEmulator = require('../components/emulator/currency');
var voteEmulator = require('../components/emulator/vote');
var twitter = require('../components/twitter');

module.exports = function(socket) {

    pipelineClient.addDataProvider(
        currencyEmulator(
            { usd: [75, 82], eur: [89, 94], time: [1500, 2500] },
            function(stream) {
                stream.on('data', function(data) {
                    if (data['type'] === 'currency') {
                        socket.emit(
                            data['currency'] + ':change',
                            data['value']
                        );
                    }
                });
            }
        )
    );


    pipelineClient.addDataProvider(
        voteEmulator({ time: [1500, 2500] }, function(stream) {
            stream.on('data', function(data) {
                if (data['type'] === 'vote') {
                    socket.emit('vote:new', data['value']);
                }
            });
        }));
    /*
    pipelineClient.addDataProvider(
        twitter({ track: 'dublin' }, function(stream) {
            stream.on('data', function(tweet) {
                socket.emit('tweet:new', tweet.text);
            });
        })
    );
    */

    pipelineClient.stream();

    socket.on('disconnect', function () {});
};
