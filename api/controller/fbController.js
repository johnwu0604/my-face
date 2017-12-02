var FacebookService = require('../service/fbService')
var async = require('async')
var result = {}

function getFacebookId(token, callback) {
    FacebookService.getFacebookId(token, function(id) {
        return callback(id)
    })
}

function getFacebookData(token, id, callback){
    var info = {}
    async.parallel([
        function(callback) {
            FacebookService.getFacebookBasicInfo(token, id, function(basic){
                info.basic_info = basic
                return callback()
            })

        },
        function(callback) {
            FacebookService.getFacebookCover(token, id, function(photo) {
                info.cover = photo.cover.source
                return callback()
            })
        },

        function(callback) {
            FacebookService.getFacebookAlbums(token, id, function(album){
                info.albums = album
                return callback();
            })
        },

        function(callback) {
            FacebookService.getFacebookProfilePicture(token, id, function (profile_picture) {
                info.profile_picture = profile_picture
                return callback();
            })
        },

        function(callback){
            FacebookService.getFacebookPhotos(token, id, function(photo){
                info.photos = photo
                return callback();
            })
        },

        function(callback){
            FacebookService.getFacebookEducation(token, id, function(education){
                info.education = education
                return callback();
            })
        },

        function(callback){
            FacebookService.getFacebookLikes(token, id, function(pages){
                info.likes = pages
                return callback();
            })
        }

    ], function(){
        return callback(info)
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
        async.series([
            function (callback) {
                getFacebookId(token, function (id) {
                    result.user_id = id
                    return callback()
                })
            },
            function (callback){
                getFacebookData(token, result.user_id, function (data){
                    result.user_info = data;
                    return callback();
                })
            }
        ], function () {
            return callback(result)
        })
    }

}