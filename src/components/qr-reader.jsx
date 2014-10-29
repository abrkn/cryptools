var React = require('react/addons')

var QRReader = React.createClass({
	componentDidMount: function() {
		var $reader = $(this.refs.reader.getDOMNode())
		$reader.html5_qrcode(this.onRead, this.onError, this.onVideoError)
	},

	onRead: function(data) {
		this.props.onRead(data)
	},

	onError: function(error) {
		this.props.onError && this.props.onError(error)
	},

	onVideoError: function(error) {
		this.props.onVideoError && this.props.onVideoError(error)
	},

	render: function() {
		return <div ref="reader" style={{ width: '300px', height: '250px'}} />
	}
})

module.exports = QRReader
