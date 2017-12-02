var EmailController = require('../api/controller/emailController')


module.exports = function(app) {
    app.post('/email', function(req, res){
        EmailController.postEmail(req, function(result) {
            res.send(result)
        })
    })
}



