var FacebookService = require('../service/fbService')
var async = require('async')
var result = {}

function getFacebookId(token, callback) {
    FacebookService.getFacebookId(token, function(id) {
        return callback(id)
    })
}

module.exports = {

    /**
     * Retrieves all information for the given facebook user
     *
     * @param req
     * @param callback
     */
    getUserInformation: function(token, callback) {
        async.parallel([
            function (callback) {
                getFacebookId(token, function (id) {
                    result.user_id = id
                    return callback()
                })
            }
        ], function () {
            return callback(result)
        })
    }

}