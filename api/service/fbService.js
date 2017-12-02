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
            return callback(response.id)
        })
    },

    getFacebookBasicInfo: function(token, id, callback){
        FB.setAccessToken(token)
        FB.api('/me?fields=first_name,last_name,birthday,work,email,hometown,link,relationship_status', function (response) {
            var obj = {
                "first_name": response.first_name,
                "last_name": response.last_name,
                "email": response.email,
                "birthday": response.birthday,
                "hometown": response.hometown.name,
                "link": response.link,
                "relationship_status": response.relationship_status,
            }
            return callback(obj)
        })
    },

    getFacebookEducation: function(token, id, callback){
        FB.setAccessToken(token)
        FB.api('/me?fields=education', function (response) {
            var education = ''
            for( var i = 0 ; i < Object.keys(response.education).length; i++) {
                if (i == 0) {
                    education += response.education[i].school.name
                }
                if (i != 0 && i == Object.keys(response.education).length - 1) {
                    education += ' and ' + response.education[i].school.name
                }
                if (i != 0 && i != Object.keys(response.education).length - 1) {
                    education += ', ' + response.education[i].school.name
                }
            }
            return callback(education)
        })
    },

    getFacebookCover: function(token, id, callback) {
        FB.setAccessToken(token)
        FB.api('/me?fields=cover', function (response) {
            return callback(response)
        })
    },

    getFacebookAlbums: function(token, id, callback) {
        FB.setAccessToken(token)
        FB.api('/me/albums', function (response) {
            return callback(response.url)
        })
    },

    getFacebookProfilePicture: function(token, id, callback){
        FB.setAccessToken(token)
        FB.api('/me?fields=picture.height(500)', function (response) {
            return callback(response.picture.data.url)
        })
    },

    getFacebookPhotos: function(token, id, callback){
        getPhotoIds(token, function(photo_ids) {
            getPhotos(photo_ids, token, function(photos) {
                return callback(photos.slice(0, 12))
            })
        })
    }
}
