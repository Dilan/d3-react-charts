var isNode = (typeof module !== 'undefined' && module.exports);
var React = (isNode ? require('react') : window.React);
var d3 = (isNode ? require('d3') : window.d3);

// components:
var Bar = (isNode ? require('./bar') : window).Bar;
var Chart = (isNode ? require('./chart') : window).Chart;

var BarChart = React.createClass({
    render: function() {
        return (
            <div>
                <Chart width={this.props.width} height={this.props.height}>
                    <Bar data={this.state.data}
                        width={this.props.width}
                        height={this.props.height} />
                </Chart>
            </div>
        );
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    },

    getDefaultProps: function() {
        return {
            width: 500,
            height: 500
        }
    },

    getInitialState: function() {
        return {
            data: [
                { x: 'a', y: 20 },
                { x: 'b', y: 14},
                { x: 'c', y: 12},
                { x: 'd', y: 30}
            ]
        }
    }
});

if (isNode) {
    module.exports = BarChart;
} else {
    window.BarChart = BarChart;
}
