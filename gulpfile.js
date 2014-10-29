var gulp = require('gulp')
var browserify = require('gulp-browserify')
var stylus = require('gulp-stylus')
var concat = require('gulp-concat')

gulp.task('vendor.js', function() {
    return gulp.src([
        'vendor/jquery-1.9.1.js',
        'vendor/bootstrap.min.js',
        'vendor/html5-qrcode.min.js',
        'vendor/tripledes.js',
        'vendor/lodash.min.js',
        'vendor/forge.bundle.js',
        'vendor/sjcl.js',
        'vendor/ripple-0.9.0-rc5-min.js',
        'vendor/stellar-lib.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build'))
})

gulp.task('vendor.css', function() {
    return gulp.src('vendor/bootstrap.min.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('build'))
})

gulp.task('index.js', function() {
    return gulp.src('src/client.js')
    .pipe(browserify({
        debug: true,
        transform: ['reactify'],
        extensions: ['.jsx']
    }))
    .on('error', function(err) {
        if (!watching) throw err
        console.error('Error: ' + err.message)
    })
    .pipe(concat('index.js'))
    .pipe(gulp.dest('build'))
})

gulp.task('index.html', function() {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('build'))
})

gulp.task('app.css', function() {
    return gulp.src('src/index.styl')
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build'))
})

gulp.task('clean', function() {
    return gulp.src(['build'], { read: false })
    .pipe(clean())
})

gulp.task('watch', function() {
    watching = true
    gulp.watch('src/**/*.html', ['index.html'])
    gulp.watch('src/**/*.styl', ['app.css'])
    gulp.watch(['src/**/*.js', 'src/**/*.jsx', 'src/**/*.html'], ['index.js'])
    gulp.watch('vendor/**/*.js', ['vendor.js'])
    gulp.watch('vendor/**/*.css', ['vendor.css'])
})

gulp.task('serve', ['default', 'watch'], function() {
    var express = require('express')
    var path = require('path')

    var server = express()
    server.use(function(req, res, next) {
        if (req.url.match(/\/[^\.]*$/)) req.url = '/'
        next()
    })
    server.use(express.static(path.resolve('build')))
    server.listen(process.env.PORT || 8080)
})

gulp.task('default', ['app.css', 'vendor.js', 'vendor.css', 'index.js', 'index.html'])
