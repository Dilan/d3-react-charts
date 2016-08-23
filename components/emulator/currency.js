var rand = function(min, max) {
    return parseFloat(Math.random() * (max - min) + min);
};
var randItem = function(list) {
    var index = Math.round(rand(0, (list.length-1)));
    return list[index];
};

module.exports = function(options, callback) {
    return function(stream) {
        (function emit() {
            var currency = randItem(['usd']); // , 'eur'

            var timeFrom = options['time'][0] || 100;
            var timeTo = options['time'][1] || 100;
            var min = options[currency][0];
            var max = options[currency][1];
            var value = rand(min, max, 2);

            stream.emit(
                'data',
                {
                    type: 'currency',
                    currency: currency,
                    time: new Date(),
                    value: value.toFixed(2)
                }
            );
            setTimeout(emit, rand(timeFrom, timeTo));
        })();
        callback(stream);
    };
};