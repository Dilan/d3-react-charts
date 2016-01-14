var socket = io.connect();

var isNode = (typeof module !== 'undefined' && module.exports);
var React = (isNode ? require('react') : window.React);
var NumberChart = (isNode ? require('./numberChart') : window.NumberChart);
var Tweet = (isNode ? require('./Tweet') : window.Tweet);
var BarChart = (isNode ? require('./chart/bar-chart') : window.BarChart);

var Dashboard = React.createClass({
    render: function() {

        return (
           <div>
               <NumberChart label="USD" number={this.state.usd} />
               <NumberChart label="EUR" number={this.state.eur} />

               <BarChart data={this.state.votes} />
           </div>
        );
    },

    getInitialState: function () {
        return {
            votes: [
                { x: 'a', y: 20 },
                { x: 'b', y: 14 },
                { x: 'c', y: 5  },
                { x: 'd', y: 30 },

            ],
            tweet: 'loading JS tweets...',
            usd: '73.8',
            eur: '80.3'
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
        console.log(data)
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

if (isNode) {
    module.exports = Dashboard;
} else {
    window.Dashboard = Dashboard;
}