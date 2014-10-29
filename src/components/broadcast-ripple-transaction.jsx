var React = require('react/addons')
var request = require('superagent')
var RippleUtil = require('../ripple-util')

var BroadcastRippleTransaction = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function() {
		return {
			txBlob: '',
			hash: null,
			network: 'ripple'
		}
	},

	onSubmit: function(e) {
		e.preventDefault()

		this.setState({ error: null })

		RippleUtil.submitTx(this.state.network, this.state.txBlob, function(err, hash) {
			if (err) return this.setState({ error: err.message })
			this.setState({ hash: hash })
		}.bind(this))
	},

	render: function() {
		return <div>
			<h2>Broacast transaction (online)</h2>

			{this.state.error && <div className="alert alert-danger">{this.state.error}</div>}

			{this.state.hash && <div className="alert alert-success">
				Sent as <a href={'https://explor.io/#/' + this.state.network + '/transactions/' + this.state.hash}>
					<small>{this.state.hash}</small>
				</a>
			</div>}

 			<form onSubmit={this.onSubmit}>
				<fieldset>
					<div className="form-group">
						<label>Transaction blob (hex)</label>
						<textarea className="form-control" valueLink={this.linkState('txBlob')} style={{ height: '200px' }} />
					</div>

					<div className="form-group">
						<label>Network</label>
						<select className="form-control" valueLink={this.linkState('network')}>
							<option value="ripple">Ripple</option>
							<option value="stellar">Stellar</option>
						</select>
					</div>

					<button className="btn btn-lg btn-success">
						Broadcast transaction
					</button>
				</fieldset>
			</form>
		</div>
	}
})

module.exports = BroadcastRippleTransaction
