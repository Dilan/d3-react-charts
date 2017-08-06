module.exports = function (socket) {
    setInterval(function() {
        var randomInterval = function(min, max) {
            return parseFloat(Math.random() * (max - min + 1) + min).toFixed(2);
        };
        socket.emit(
            'state:change',
            'Alaska',
            randomInterval(100, 200)
        );
        socket.emit(
            'state:change',
            'Alabama',
            randomInterval(100, 220)
        );
    }, 3000);

    socket.on('disconnect', function () { });
};
