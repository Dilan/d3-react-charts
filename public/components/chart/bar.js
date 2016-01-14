var isNode = (typeof module !== 'undefined' && module.exports);
var React = (isNode ? require('react') : window.React);
var d3 = (isNode ? require('d3') : window.d3);

var Bar = React.createClass({
    getDefaultProps: function() {
        return {
            width: 0,
            height: 0,
            offset: 0
        }
    },

    render: function() {
        return (
            <rect
                fill={this.props.color}
                width={this.props.width}
                height={this.props.height}
                x={this.props.offset}
                y={this.props.availableHeight - this.props.height} />
        );
    }
});

if (isNode) {
    module.exports = Bar;
} else {
    window.Bar = Bar;
}
