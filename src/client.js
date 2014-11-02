require('debug').enable('*')
require('../node_modules/bootstrap/less/bootstrap.less')
require('./index.styl')

var React = require('react/addons')
window.React = React
window.$ = window.jQuery = require('jquery')

require('../vendor/html5-qrcode.min.js')

var App = require('./app')
var app = new App()

var comp = app.getComponent()
var mountNode = document.getElementById('app')

React.renderComponent(comp, mountNode)
