var socket = io.connect();

var React = require('react');
var NumberChart = require('./components/NumberChart');
var Tweet = require('./components/Tweet');
var BarChart = require('./components/chart/BarChart');

var Dashboard = React.createClass({
    render: function() {
        return (
           <div>
               <NumberChart label="EUR: " number={this.state.eur} />
               <NumberChart label="USD: " number={this.state.usd} />
               <BarChart data={this.state.votes} />
               <Tweet text={this.state.tweet} />
           </div>
        );
    },

    getInitialState: function () {
        return {
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
        socket.on('usd:change', this.onCurrencyChange.bind(this, 'usd'));
        socket.on('eur:change', this.onCurrencyChange.bind(this, 'eur'));
        socket.on('tweet:new', this.onTweet);
        socket.on('vote:new', this.onVote);
    },

    onTweet: function(text) {
        this.setState({ tweet: text });
    },

    onVote: function(data) {
        this.setState({ votes: data });
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
