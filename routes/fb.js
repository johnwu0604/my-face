var async = require('async')

var FacebookController = require('../api/controller/fbController')


module.exports = function(app) {
    app.get('/fb-user-data/:token', function(req, res){
        FacebookController.getUserInformation(req.params.token, function(result) {
            res.send(result)
        })
    })
}
