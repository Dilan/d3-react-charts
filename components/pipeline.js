var Pipeline = function(options) {
    if (!(this instanceof Pipeline)) return new Pipeline(options);
    this.dp = [];
};

Pipeline.prototype.addDataProvider = function(dp) {
    this.dp.push(dp);
};

Pipeline.prototype.stream = function() {
    var stream = new (require('events').EventEmitter)();
    this.dp.forEach(function(dp) {
        dp(stream)
    });
};

module.exports = Pipeline;
