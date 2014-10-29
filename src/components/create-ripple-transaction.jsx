var React = require('react/addons')
var RippleUtil = require('../ripple-util')
var request = require('superagent')

var CreateRippleTransaction = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function() {
		return {
			account: '',
			destination: '',
			destinationTag: '',
			currency: '',
			amount: '',
			issuer: '',
			sequence: '',
			error: null
		}
	},

	onChange: function(key, e) {
		var changes = {}
		changes[key] = e.target.value
		this.setState(changes)
	},

	onSubmit: function(e) {
		e.preventDefault()

		var nativeCurr = this.state.account[0] == 'g' ? 'STR' : 'XRP'

		this.setState({ error: null })

		if (!this.state.sequence.length) {
			this.setState({ error: 'Account sequence is required. Use lookup to fetch it' })
			return
		}

		var amount = this.state.currency == nativeCurr ?
			(this.state.amount * 1e6).toString() :
			{
				issuer: this.state.issuer || this.state.destination,
				value: this.state.amount,
				currency: this.state.currency
			}

		var tx = {
			TransactionType: 'Payment',
			Fee: 10000,
			Sequence: +this.state.sequence,
			Account: this.state.account,
			DestinationTag: +this.state.destinationTag,
			Amount: amount,
			Destination: this.state.destination
		}

		this.setState({
			txJson: JSON.stringify(tx)
		})
	},

	onClickNewWindow: function(e) {
		e.preventDefault()
		window.open('data:text/csv;charset=utf-8,' + escape(this.state.txJson))
	},

	onClickLookupAccountSequence: function(e) {
		e.preventDefault()

		this.setState({ error: null })

		var network = this.state.account[0] == 'r' ? 'ripple' : 'stellar'

		RippleUtil.fetchAccountSequence(network, this.state.account, function(err, seq) {
			if (err) return this.setState({ error: err.message })
			this.setState({ sequence: seq.toString() })
		}.bind(this))
	},

	render: function() {
		return <div>
			<h2>Create transaction (online)</h2>

			<p>
				Every transaction contains a sequence number. The sequence number prevents the same transaction
				from being sent twice or transactions to be sent out of order.
			</p>

			{this.state.error && <div className="alert alert-danger">{this.state.error}</div>}

 			<form onSubmit={this.onSubmit}>
				<fieldset>
					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<label>Source account</label>
								<input className="form-control" valueLink={this.linkState('account')} />
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-group">
								<label>Sequence</label>
								<div className="input-group">
									<input
										className="form-control"
										valueLink={this.linkState('sequence')}
									/>
									<span className="input-group-btn">
											<button
												className="btn btn-default"
												onClick={this.onClickLookupAccountSequence}
											>
												Lookup
										</button>
										</span>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-8">
							<div className="form-group">
								<label>Destination account</label>
								<input className="form-control" valueLink={this.linkState('destination')} />
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-group">
								<label>Destination tag (optional)</label>
								<input className="form-control" valueLink={this.linkState('destinationTag')} />
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-3">
							<div className="form-group">
								<label>Amount</label>
								<input className="form-control" valueLink={this.linkState('amount')} />
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label>Currency</label>
								<input className="form-control" valueLink={this.linkState('currency')} />
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label>Issuer (optional)</label>
								<input className="form-control" valueLink={this.linkState('issuer')} />
							</div>
						</div>
					</div>

					<button className="btn btn-lg btn-success">
						Create transaction
					</button>

					<div className="form-group">
						<label>Transaction JSON</label>
						<textarea
							className="form-control"
							readOnly="true"
							value={this.state.txJson}
							style={{ height: '200px' }}
						/>
					</div>

					<button
						className="btn btn-default"
						onClick={this.onClickNewWindow}
						disabled={!this.state.txJson && 'disabled'}
					>
						New window...
					</button>
				</fieldset>
			</form>
		</div>
	}
})

module.exports = CreateRippleTransaction
