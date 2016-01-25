var isNode = (typeof module !== 'undefined' && module.exports);
var React = (isNode ? require('react') : window.React);
var ReactTransitionGroup = (isNode ? require('react-addons-transition-group') : window.ReactTransitionGroup);
var ReactCSSTransitionGroup = (isNode ? require('react-addons-css-transition-group') : window.ReactCSSTransitionGroup);

var NumberChart = React.createClass({
    render: function() {
        var className = (
            (this.state.prevNumber < this.state.number) ? 'plus-fade-out' : 'minus-fade-out'
        );

        return (
            <div className="box">
                <h3>
                    <span>{this.state.label}</span>
                    <ReactCSSTransitionGroup
                        transitionName={className}
                        transitionEnterTimeout={2500}
                        transitionLeaveTimeout={1000}>
                        <span key={this.state.number}>{this.state.number}</span>
                    </ReactCSSTransitionGroup>
                </h3>
            </div>
        );
    },

    getInitialState: function () {
        return {
            label: this.props.label || '',
            number: this.props.number || 0,
            prevNumber: this.props.prevNumber || 0
        };
    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            label: nextProps.label || this.state.label,
            number: nextProps.number,
            prevNumber: this.state.number
        });
    }
});

if (isNode) {
    module.exports = NumberChart;
} else {
    window.NumberChart = NumberChart;
}