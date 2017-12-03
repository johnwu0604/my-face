var ExportService = require('../service/exportService')
var async = require('async')

function postWebsiteData(data, callback) {
    ExportService.postWebsiteData(data, function(url) {
        return callback(url)
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
        postWebsiteData(data, function (url) {
            return callback(url)
        })
    }

}