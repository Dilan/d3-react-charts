var rand = function(min, max) {
    return parseFloat(Math.random() * (max - min) + min);
};

module.exports = function(options, callback) {
    return function (stream) {
        (function emit() {
            var timeFrom = options['time'][0] || 1000;
            var timeTo = options['time'][1] || 2000;

            var randomInterval = function (min, max) {
                return parseFloat(Math.random() * (max - min + 1) + min).toFixed(2);
            };

            stream.emit(
                'data',
                {
                    type: 'vote',
                    time: new Date(),
                    value: [
                        [
                            {"x": 1, "y": randomInterval(23, 87)},
                            {"x": 1, "y": randomInterval(13, 27)}
                        ], [
                            {"x": 2, "y": randomInterval(9, 59)},
                            {"x": 2, "y": randomInterval(24, 25)}
                        ]
                    ]
                }
            );
            setTimeout(emit, rand(timeFrom, timeTo));
        })();
        callback(stream)
    }
};
