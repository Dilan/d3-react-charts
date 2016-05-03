//
var React = require('react');

var Chart = React.createClass({
    render: function() {
        return (
            <svg
                className="box"
                width={this.props.width}
                height={this.props.height}>
                {this.props.children}
            </svg>
        );
    },

    getInitialState: function () {
        return {};
    }
});

if ((typeof module !== 'undefined' && module.exports)) { // node.js
    module.exports = Chart;
} else {
    window.Chart = Chart;
}
