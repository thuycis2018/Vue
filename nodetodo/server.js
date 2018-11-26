//server.js

/* jslint node: true */
'use strict'

var express = require('express')

var morgan = require('morgan')

var path = require('path')

var app = express()

var mongoose = require('mongoose')

var bodyParser = require('body-parser')

// Require configuration file defined in app/config.js
var config = require('./app/config')

// Connect to database
mongoose.connect(config.DB)

// Sends static files  from the public path directory
app.use(express.static(path.join(__dirname, '/public')))

// Use morgan to log request in dev mode
app.use(morgan('dev'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

var port = config.APP_PORT || 1338

// app.listen(port,"0.0.0.0") // Listen on port defined in config file
app.listen(port)
console.log('App listening on port ' + port)

var todoRoutes = require('./app/routes')

//  Use routes defined in route.js and prefix it with api
app.use('/api', todoRoutes)

app.use(function (req, res, next) {
    // Website you wish to allow to connect
 res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)
 // res.header("Access-Control-Allow-Origin", "*")
    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') 
    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Pass to next layer of middleware
  next()
})
// Server index.html page when request to the root is made
app.get('/', function (req, res, next) {
  res.sendfile('./public/index.html')
})