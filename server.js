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

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// routes ======================================================================
require('./routes/public')(app)
require('./routes/fb')(app)
require('./routes/email')(app)
require('./routes/auth')(app)

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listing on port " + port)