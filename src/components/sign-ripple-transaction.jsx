var React = require('react/addons')

var SignRippleTransaction = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function() {
		return {
			txJson: '',
			secret: '',
			txBlob: '',
			error: null,
			network: 'ripple'
		}
	},

	onSubmit: function(e) {
		e.preventDefault()

		this.setState({ error: null })

		var intf = this.state.network == 'ripple' ? ripple : stellar

        var tx = new intf.Transaction()
        tx.remote = null
        tx.tx_json = JSON.parse(this.state.txJson)
        tx._secret = this.state.secret

        if (!tx.complete()) {
        	return this.setState({ error: 'Failed to complete transaction' })
        }

        try {
            tx.sign()
        } catch (error) {
        	this.setState({ error: error.message })
        }

        var hex = tx.serialize().to_hex()

        this.setState({ txBlob: hex })
	},

	onClickNewWindow: function(e) {
		e.preventDefault()
		window.open('data:text/csv;charset=utf-8,' + escape(this.state.txBlob))
	},

	render: function() {
		return <div>
			<h2>Sign a transaction (offline)</h2>

			{this.state.error && <div className="alert alert-danger">{this.state.error}</div>}

 			<form onSubmit={this.onSubmit}>
				<fieldset>
					<div className="form-group">
						<label>Transaction JSON</label>
						<textarea className="form-control" valueLink={this.linkState('txJson')} style={{ height: '200px' }} />
					</div>

					<div className="form-group">
						<label>Secret</label>
						<input type="text" className="form-control" valueLink={this.linkState('secret')} />
					</div>

					<div className="form-group">
						<label>Network</label>
						<select className="form-control" valueLink={this.linkState('network')}>
							<option value="ripple">Ripple</option>
							<option value="stellar">Stellar</option>
						</select>
					</div>

					<button className="btn btn-lg btn-success">
						Create transaction
					</button>

					<div className="form-group">
						<label>Signed transaction</label>
						<textarea className="form-control" value={this.state.txBlob} readOnly="true" style={{ height: '200px' }} />
					</div>

					<button
						className="btn btn-default"
						onClick={this.onClickNewWindow}
						disabled={!this.state.txBlob && 'disabled'}
					>
						New window...
					</button>
				</fieldset>
			</form>
		</div>
	}
})

module.exports = SignRippleTransaction
