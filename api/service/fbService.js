var FB = require('fb')

module.exports = {

    getFacebookId: function(token, callback) {
        FB.setAccessToken(token)
        FB.api('/me', function(response) {
            console.log('response is : ' + response)
            return callback(response.id)
        })
    },

    getFacebookBasicInfo: function(token, id, callback){
        FB.setAccessToken(token)
        FB.api('/me?fields=birthday,education,email,hometown,languages,locale,relationship_status', function (response) {
            console.log('basic info response is : ' + response)
            return callback(response)
        })
    },

    getFacebookCover: function(token, id, callback) {
        FB.setAccessToken(token)
        FB.api('/me?fields=cover', function (response) {
            console.log('cover response is : ' + response)
            return callback(response)
        })
    },

    getFacebookAlbums: function(token, id, callback) {
        FB.setAccessToken(token)
        FB.api('/me/albums', function (response) {
            console.log('albums response is : ' + response)
            return callback(response.url)
        })
    },

    getFacebookProfilePicture: function(token, id, callback){
        FB.setAccessToken(token)
        FB.api('/me/picture', function (response) {
            console.log('profile_pic response is : ' + response)
            return callback(response.data)
        })
    },

    getFacebookPhotos: function(token, id, callback){
        FB.setAccessToken(token)
        FB.api('/me/photos?limit=10', function (response) {
            var photos = [];
            console.log('photos response is : ' + response)
            for(var i = 0 ; i < Object.keys(response.data).length ; i++){
                FB.api('/' + response.data[i].id +'?fields=images', function (res) {
                    var element = {"url":res.images[0].source}
                    photos.push(element)
                })
            }
            return callback(photos);
        })
    }
}