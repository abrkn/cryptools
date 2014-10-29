var React = require('react/addons')
var QRReader = require('./qr-reader')

var QRSCan = React.createClass({
	getInitialState: function() {
		return {
			data: '',
			error: ''
		}
	},

	onRead: function(data) {
		console.log('le read', data)
		this.setState({ data: data })
	},

	onError: function(error) {
		this.setState({ error: error })
	},

	render: function() {
		return <div>
			<QRReader onRead={this.onRead} onError={this.onError} />

			<div className="form-group">
				<label>Output</label>
				<textarea className="form-control" value={this.state.data} readOnly="true" style={{ height: '200px' }} />
				{this.state.error && <span>{this.state.error}</span>}
			</div>
		</div>
	}
})

module.exports = QRSCan
