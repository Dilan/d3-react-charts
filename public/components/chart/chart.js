var isNode = (typeof module !== 'undefined' && module.exports);
var React = (isNode ? require('react') : window.React);
var d3 = (isNode ? require('d3') : window.d3);

var Chart = React.createClass({
    render: function() {
        return (
            <svg
                width={this.props.width}
                height={this.props.height}>
                {this.props.children}
            </svg>
        );
    },

    getInitialState: function () {
        return {

        };
    }
});

if (isNode) {
    module.exports = Chart;
} else {
    window.Chart = Chart;
}
