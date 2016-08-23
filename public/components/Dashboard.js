// var socket = io.connect();

var React = require('react');
var NumberChart = require('./components/NumberChart');
var Tweet = require('./components/Tweet');
var BarChart = require('./components/chart/BarChart');

var rand = function(min, max) {
    return parseFloat(Math.random() * (max - min) + min);
};

var Dashboard = React.createClass({
    render: function() {
        return (
           <div>
               <BarChart data={this.state.votes} />
               <NumberChart label="EUR: " number={this.state.eur} />
               <NumberChart label="USD: " number={this.state.usd} />
           </div>
        );
    },

    getInitialState: function () {
        return {
            data: [

            ],
            votes: [
                [
                    { "x": 1, "y":  91 },
                    { "x": 1, "y":  30 }
                ], [
                    { "x": 2, "y":  34 },
                    { "x": 2, "y":  30 }
                ]
            ],
            tweet: 'loading JS tweets...',
            usd: '73.80',
            eur: '80.30'
        };
    },

    componentDidMount: function() {
/*
        socket.on('usd:change', this.onCurrencyChange.bind(this, 'usd'));
        socket.on('eur:change', this.onCurrencyChange.bind(this, 'eur'));
        socket.on('tweet:new', this.onTweet);
        socket.on('vote:new', this.onVote);
*/
        this.emulateChanges();
    },

    emulateChanges: function() {
        var self = this;
        setInterval(function() {
            self.onCurrencyChange('usd', rand(61, 65).toFixed(2))
        }, 2500);
        setInterval(function() {
            self.onCurrencyChange('eur', rand(71, 75).toFixed(2))
        }, 2900);

        setInterval(function() {
            self.onVote(
                [
                    [
                        {"x": 1, "y": rand(23, 87)},
                        {"x": 1, "y": rand(13, 27)}
                    ], [
                        {"x": 2, "y": rand(9, 59)},
                        {"x": 2, "y": rand(24, 90)}
                    ]
                ]
            )
        }, 1500);
    },

    loadData: function() {
        $.get('/data/products', function(result) {
            var getOptions = function getOptions(list, prefix) {
                return list.reduce(function(result, item) {
                    var label = item.title[0].text;
                    result.push({ label: label, value: (item.id || item._id) });
                    return result;
                }, []);
            };
            callback(
                null,
                {
                    complete: true,
                    options: getOptions(result.data)
                }
            );
        }.bind(this));
    },

    onTweet: function(text) {
        this.setState({ tweet: text });
    },

    onVote: function(data) {
        this.setState({ votes: data });
    },

    onData: function(data) {
        this.setState({ data: data });
    },

    onCurrencyChange: function(currency, value) {
        var state = {};
        state[currency] = value;
        this.setState(state);
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    }
});

if ((typeof module !== 'undefined' && module.exports)) { // node.js
    module.exports = Dashboard;
} else {
    window.Dashboard = Dashboard;
}
