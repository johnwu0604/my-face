// set up ======================================================================
var express = require('express')
var app = express()
var port = process.env.PORT || 5000

var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

// routes ======================================================================
require('./routes/public')(app)
require('./routes/fb')(app)

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listing on port " + port)