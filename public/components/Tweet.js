var React = require('react');

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

if ((typeof module !== 'undefined' && module.exports)) { // node.js
    module.exports = Tweet;
} else {
    window.Tweet = Tweet;
}
