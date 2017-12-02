var EmailService = require('../service/emailService')


function postEmail(req, callback) {
    EmailService.postEmail(req, function(res) {
        return callback(res)
    })
}


module.exports = {

    /**
     * Retrieves all information for the given facebook user
     *
     * @param req
     * @param callback
     */
    postEmail: function(req, callback) {
        postEmail(req, function(response){
            return callback(response);
        })
    }
}