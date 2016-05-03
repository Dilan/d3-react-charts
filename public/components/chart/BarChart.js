var React = require('react');

// components:
var Bar = require('./Bar');
var Chart = require('./Chart');

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
                [
                    { "x": 1, "y":  91 },
                    { "x": 1, "y":  30 }
                ], [
                    { "x": 2, "y":  34 },
                    { "x": 2, "y":  30 }
                ]
            ]
        }
    }
});

if ((typeof module !== 'undefined' && module.exports)) { // node.js
    module.exports = BarChart;
} else {
    window.BarChart = BarChart;
}
