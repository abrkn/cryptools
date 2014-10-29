var React = require('react/addons')
var MenuItem = require('./menu-item')
var MenuGroup = require('./menu-group')

var Navigation = React.createClass({
	render: function() {
		var hash = this.props.hash

		return <div className="site-nav">
			<p className="logo">Cryptoolkit</p>

			<div className="">
				<MenuGroup heading="Generic">
					<MenuItem href="#/scan-qr/" active={hash == '/scan-qr/'}>
						Scan QR
					</MenuItem>
					<MenuItem href="#/des3-decode/" active={hash == '/des3-decode/'}>
						Decode DES3
					</MenuItem>
				</MenuGroup>

				<MenuGroup heading="Ripple/Stellar">
					<MenuItem href="#/ripple/create/" active={hash == '/ripple/create/'}>
						Create transaction
					</MenuItem>
					<MenuItem href="#/ripple/sign/" active={hash == '/ripple/sign/'}>
						Sign transaction
					</MenuItem>
					<MenuItem href="#/ripple/broadcast/" active={hash == '/ripple/broadcast/'}>
						Broadcast transaction
					</MenuItem>
				</MenuGroup>
			</div>
		</div>
	}
})

module.exports = Navigation
