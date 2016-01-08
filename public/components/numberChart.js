var isNode = (typeof module !== 'undefined' && module.exports);
var React = (isNode ? require('react') : window.React);

var NumberChart = React.createClass({
    render: function() {
        return (
            <div className="box">
                <h3>{this.state.label} : {this.state.number}</h3>
            </div>
        );
    },

    getInitialState: function () {
        return {
            label: this.props.label || '',
            number: this.props.number || 0
        };
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    }
});

if (isNode) {
    module.exports = NumberChart;
} else {
    window.NumberChart = NumberChart;
}