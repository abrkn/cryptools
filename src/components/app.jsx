var React = require('react/addons')
var QRReader = require('./qr-reader')
var Nav = require('./nav')
var CreateRippleTransaction = require('./create-ripple-transaction')
var SignRippleTransaction = require('./sign-ripple-transaction')
var BroadcastRippleTransaction = require('./broadcast-ripple-transaction')
var ScanQR = require('./scan-qr')
var Des3Decode = require('./des3-decode')

var App = React.createClass({
    componentDidMount: function() {
    	window.addEventListener('hashchange', function() {
    		this.forceUpdate()
    	}.bind(this))
    },

	render: function() {
		var hash = location.hash.substr(1)

		return <div className="container">
			<div className="col-md-3">
				<Nav hash={hash} />
			</div>
			<div className="col-md-9">
				{hash == '/ripple/create/' && <CreateRippleTransaction />}
				{hash == '/ripple/sign/' && <SignRippleTransaction />}
				{hash == '/ripple/broadcast/' && <BroadcastRippleTransaction />}
				{hash == '/scan-qr/' && <ScanQR />}
				{hash == '/des3-decode/' && <Des3Decode />}
			</div>
		</div>
	}
})

module.exports = App
