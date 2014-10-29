var React = require('react/addons')

var MenuItem = React.createClass({
    render: function() {
        return this.transferPropsTo(
        	<a href={this.props.href} className={'list-group-item' + (this.props.active ? ' active' : '')}>
            	{this.props.children}
	      	</a>
      	)
    }
})

module.exports = MenuItem
