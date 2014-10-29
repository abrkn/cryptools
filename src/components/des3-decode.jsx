var React = require('react/addons')

function decrypt(input, password) {
  // 3DES key and IV sizes
  var keySize = 24;
  var ivSize = 8;

  var salt = null;

  var key = null;
  var iv = null;

  // If input begins with 'Salted__', the next 8 bytes is the salt.
  if (input.length >= 16
      && input[0] === 0x53
      && input[1] === 0x61
      && input[2] === 0x6C
      && input[3] === 0x74
      && input[4] === 0x65
      && input[5] === 0x64
      && input[6] === 0x5F
      && input[7] === 0x5F) {
    // Extract salt and adjust pointer.
    salt = input.slice(8, 16).toString('binary');
    input = input.slice(16);
  }

  // Use OpenSSL's key derivation function.
  var dk = forge.pbe.opensslDeriveBytes(password, salt, keySize + ivSize);

  // Split the derived key into the actual key and the IV.
  key = dk.slice(0, keySize);
  iv = dk.slice(keySize, keySize + ivSize);

  // Decrypt.
  var decipher = forge.cipher.createDecipher('3DES-CBC', key);
  decipher.start({ iv: iv });
  decipher.update(forge.util.createBuffer(input.toString('binary')));
  decipher.finish();

  return decipher.output.toString();
}

var Des3Decode = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function() {
		return {
			input: '',
			encoding: null,
			passphrase: '',
			output: '',
			error: null
		}
	},

	onSubmit: function(e) {
		e.preventDefault()

		var asBuffer = new Buffer(this.state.input, this.state.encoding)
		var decrypted = decrypt(asBuffer, this.state.passphrase)

		this.setState({ output: decrypted })
	},

	render: function() {
		return <div>
			<h2>Decode using DES3</h2>

			<form onSubmit={this.onSubmit}>
				<fieldset>
					<div className="form-group">
						<label>Input</label>
						<textarea className="form-control" valueLink={this.linkState('input')} style={{ height: '100px' }} />
					</div>

					<div className="form-group">
						<label>Encoding</label>
						<select className="form-control" valueLink={this.linkState('encoding')}>
							<option value="xxd">HEX (xxd)</option>
							<option value="base64">Base64</option>
						</select>
					</div>

					<div className="form-group">
						<label>Passphrase</label>
						<input type="password" className="form-control" valueLink={this.linkState('passphrase')} />
					</div>

					<div className="form-group">
						<label>Output</label>
						<input type="text" className="form-control" valueLink={this.linkState('output')} />
					</div>

					<button type="submit" className="btn btn-success btn-lg">
						Decode and decrypt
					</button>
				</fieldset>
			</form>
		</div>
	}
})

module.exports = Des3Decode
