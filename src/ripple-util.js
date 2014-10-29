var servers = {
	ripple: 'wss://s1.ripple.com',
	stellar: 'wss://live.stellar.org:9001'
}

var lodash = require('lodash')

exports.request = function(network, req, cb) {
	req = _.extend({}, req, { id: 1 })

	var ws = new WebSocket(servers[network])

	ws.onmessage = function(msg) {
		if (!msg.data) return
		var data = JSON.parse(msg.data)
		if (data.id != 1) return
		if (data.error) return cb(new Error(data.error_message || data.error))
		cb(null, data.result)
		ws.close()
	}

	ws.onerror = function(err) {
		cb(err)
	}

	ws.onopen = function() {
		ws.send(JSON.stringify(req))
	}
}

exports.fetchAccountSequence = function(network, account, cb) {
	exports.request(network, {
		command: 'account_info',
		account: account
	}, function(err, res) {
		cb(err, err ? null : res.account_data.Sequence)
	})
}

exports.submitTx = function(network, hex, cb) {
	exports.request(network, {
		command: 'submit',
		tx_blob: hex
	}, function(err, res) {
		if (err) return cb(er)
		if (res.engine_result != 'tesSUCCESS') return cb(new Error(res.engine_result_message || res.engine_result))
		cb(err, err ? null : res.tx_json.hash)
	})
}
