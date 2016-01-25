var isNode = (typeof module !== 'undefined' && module.exports);
var React = (isNode ? require('react') : window.React);
var d3 = (isNode ? require('d3') : window.d3);

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
        var y = this.props.height - height + this.props.y;

        if (coefficient === 1 || (this.state.height === this.props.height)) {
            clearInterval(this.intervalId);
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

    shouldComponentUpdate: function(nextProps) {
        return this.props.data !== nextProps.data;
    },

    render: function() {
        var props = this.props;
        var data = props.data.map(function(d) {
            return d.y;
        });

        var yScale = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, this.props.height]);

        var xScale = d3.scale.ordinal()
            .domain(d3.range(this.props.data.length))
            .rangeRoundBands([0, this.props.width], 0.05);

        var bars = data.map(function(point, i) {
            var height = yScale(point),
                y = (props.height - height) || 0,
                width = xScale.rangeBand(),
                x = xScale(i);

            return (
                <Rect height={height}
                    width={width}
                    x={x}
                    y={y || 0}
                    key={i} />
            )
        });

        return (
            <g>{bars}</g>
        );
    }
});

if (isNode) {
    module.exports = Bar;
} else {
    window.Bar = Bar;
}
