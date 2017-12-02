var FB = require('fb')
var async = require('async')

function getPhotoIds(token, callback) {
    FB.setAccessToken(token)
    FB.api('/me/photos?pretty=0&fields=likes.limit(0).summary(true)&since=2016-07-01&limit=30', function (response) {
        var photo_ids = []
        for(var i = 0 ; i < Object.keys(response.data).length; i++){
            var element =  {}
            element.id = response.data[i].id
            element.likes = response.data[i].likes.summary.total_count
            photo_ids.push(element)
        }
        photo_ids.sort(function(a, b){
            b.likes - a.likes;
        })
        return callback(photo_ids)
    })
}

function getPhotos(photo_ids, token, callback) {
    var photos = []
    async.forEach(photo_ids, function (photo, callback){
        getPhoto(photo.id, token, function (url) {
            photos.push({"url": url})
            callback()
        })
    }, function(err) {
        if (err) console.log(err)
        return callback(photos)
    })
}

function getPhoto(id, token, callback){
    FB.setAccessToken(token)
    FB.api('/' + id +'?fields=images', function (res) {
        return callback(res.images[0].source)
    })
}

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
        FB.api('/me?fields=first_name,last_name,birthday,education.limit(1),work,email,hometown,languages,link,locations,relationship_status', function (response) {
            console.log('basic info response is : ' + response)
            return callback(response)
        })
    },

    getFacebookEducation: function(token, id, callback){
        FB.setAccessToken(token)
        FB.api('/me?fields=first_name,last_name,birthday,education.limit(1),work,email,hometown,languages,link,locations,relationship_status', function (response) {
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
        FB.api('/me?fields=picture.height(500)', function (response) {
            console.log('profile_pic response is : ' + response)
            return callback(response.picture.data.url)
        })
    },

    getFacebookPhotos: function(token, id, callback){
        getPhotoIds(token, function(photo_ids) {
            getPhotos(photo_ids, token, function(photos) {
                return callback(photos)
            })
        })
    }
}