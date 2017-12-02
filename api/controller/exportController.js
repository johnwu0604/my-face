var ExportService = require('../service/exportService')
var async = require('async')

function postWebsiteData(data, callback) {
    ExportService.postWebsiteData(data, function() {
        return callback()
    })
}


module.exports = {

    /**
     * Retrieves all information for the given facebook user
     *
     * @param req
     * @param callback
     */
    postWebsiteData: function(data, callback) {
        async.series([
            function (callback) {
                postWebsiteData(data, function (result) {
                    return callback(result)
                })
            }
        ], function (result) {
            return callback(result)
        })
    }

}