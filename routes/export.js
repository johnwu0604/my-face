var ExportController = require('../api/controller/exportController')

module.exports = function(app) {
    app.post('/website/', function(req, res){
        ExportController.postWebsiteData(req.body, function(url) {
            console.log('URL: '+ url)
            res.send(url)
        })
    })
}


