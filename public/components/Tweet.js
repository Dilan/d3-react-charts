var isNode = (typeof module !== 'undefined' && module.exports);
var React = (isNode ? require('react') : window.React);

var Tweet = React.createClass({
    render: function() {
        return (
            <div className="box">
                <h4>{this.state.text}</h4>
            </div>
        );
    },

    getInitialState: function () {
        return {
            text: this.props.text || ''
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    }
});

if (isNode) {
    module.exports = Tweet;
} else {
    window.Tweet = Tweet;
}