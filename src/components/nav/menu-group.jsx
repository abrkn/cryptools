var React = require('react/addons')

var MenuGroup = React.createClass({
    render: function() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                {this.props.heading}
            </div>
            <div className="panel-body">
                <div className="list-group">
                    {this.props.children}
                </div>
            </div>
        </div>
    }
})

module.exports = MenuGroup
