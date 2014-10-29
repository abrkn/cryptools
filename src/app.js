var Application = require('./components/app')

function App(initialState) {
}

App.prototype.getComponent = function () {
    var appComponent = Application();
    return appComponent;
}

module.exports = App
