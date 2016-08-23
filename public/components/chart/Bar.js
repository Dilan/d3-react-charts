//
var React = require('react');
var d3 = require('d3');

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        var intervalId = setInterval.apply(null, arguments);
        this.intervals.push(intervalId);
        return intervalId;
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};

var Rect = React.createClass({

    mixins: [SetIntervalMixin],

    render: function() {
        var easyeasy = d3.ease('back-out');

        var coefficient = easyeasy(Math.min(1, this.state.milliseconds/1000)); // 1 second
        var height = this.state.height + (this.props.height - this.state.height) * coefficient;
        height = height < 0 ? 0 :height;
        var y = this.props.height - height + this.props.y + 40;

        if (coefficient === 1 || (this.state.height === this.props.height)) {
            clearInterval(this.intervalId);
        }

        //console.log('this.props.height : ' + this.props.height)

        if (height < 0) {
            console.log('coefficient: ' + coefficient);
            console.log('height: ' + height);
            console.log('this.state.height: ' + this.state.height)
            console.log('this.props.height: ' + this.props.height)
        }

        return (
            <rect
                className="bar"
                height={height}
                width={this.props.width}
                y={y}
                x={this.props.x}
            >
            </rect>
        );
    },

    /*
     shouldComponentUpdate: function(nextProps) {
         return this.props.height !== this.state.height;
     },
     */

    componentWillMount: function() {
        // console.log('will mount');
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({ milliseconds: 0, height: this.props.height });

        if (this.isMounted()) {
            clearInterval(this.intervalId); // clear previous
            this.intervalId = this.setInterval(this.tick, 10);
        }
    },

    componentDidMount: function() {
        this.intervalId = this.setInterval(this.tick, 10);
    },

    tick: function() {
        this.setState({ milliseconds: this.state.milliseconds + 10 });
    },

    getDefaultProps: function() {
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    },

    getInitialState: function() {
        return {
            milliseconds: 0,
            height: 0
        };
    }
});

var Bar = React.createClass({
    getDefaultProps: function() {
        return {
            data: []
        }
    },

    getInitialState: function() {
        return {
            max: 0
        };
    },

    shouldComponentUpdate: function(nextProps) {
        return this.props.data !== nextProps.data;
    },

    componentWillReceiveProps: function(nextProps) {

        var maxY = nextProps.data.reduce(function(result, item) {
            var my = Math.max.apply(null, item.map(function(i) {
                return i.y;
            }));
            return my > result ? my : result;
        }, 0);

        this.setState({ max: maxY });
    },

    render: function() {
        var props = this.props;

        var maxY = props.data.reduce(function(result, item) {
            var my = Math.max.apply(null, item.map(function(i) {
                return i.y;
            }));
            return my > result ? my : result;
        }, 0);

        maxY = Math.max(this.state.max, maxY);

        var yScale = d3.scale.linear()
            .domain([0, maxY])
            .range([0, this.props.height]);

        var xScale = d3.scale.ordinal()
            .domain([1, 2])
            .rangeRoundBands([0, this.props.width], 0.25);

        var bars = props.data.map(function(points, index) {

            return points.map(function(point, i) {

                var height = yScale(point.y),
                    y = (props.height - height) || 0,
                    width = xScale.rangeBand() / 2,
                    x = xScale(point.x) + i*width;

                var key = index + '-' + i;

                return (
                    <Rect height={height}
                          width={width}
                          x={x}
                          y={y || 0}
                          key={key} />
                );
            });
        });

        return (
            <g>
                {bars}
            </g>
        );
    }
});

if ((typeof module !== 'undefined' && module.exports)) { // node.js
    module.exports = Bar;
} else {
    window.Bar = Bar;
}
