var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config()

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/live', require('./src/routes/live'))
app.use('/packaging', require('./src/routes/packaging'))
app.use('/storage', require('./src/routes/storage'))
app.use('/transcoding', require('./src/routes/transcoding'))

module.exports = app