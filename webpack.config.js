var webpack = require('webpack')
var lodash = require('lodash')

var client = {
  entry: {
    client: ['./src/index.styl', './src/client.js']
  },

  output: {
    path: __dirname + '/build/public',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx'},
      {test: /\.css$/, loader: 'css'},
      {test: /\.styl$/, loader: 'style!css!stylus'},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.(eot|ttf|woff)$/, loader: 'file?name=fonts/[name]-[hash:6].[ext]'},
      {test: /\.svg$/, include: /images[\\\/]icons/, loader: 'raw'}, // Embed SVG icons
      {test: /\.(png|svg)$/, exclude: /images[\\\/]icons/, loader: 'file?name=images/[name]-[hash:6].[ext]'}
    ]
  },

  stylus: {
    use: []
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    unsafeCache: true
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(nb)$/),
    new webpack.DefinePlugin({
      'process.env': lodash.mapValues(lodash.pick(process.env,
          'NODE_ENV'
        ), JSON.stringify)
    })
  ]
}

module.exports = client
