require('debug').enable('*')

var React = require('react/addons')
window.React = React

var App = require('./app')
var dehydratedState = App && App.Context


var app = new App()

var comp = app.getComponent()
var mountNode = document.getElementById('app')

React.renderComponent(comp, mountNode)
