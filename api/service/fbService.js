var FB = require('fb')
var async = require('async')


function parseNewFacebookPhotos(id, callback){
    FB.api('/' + id +'?fields=images', function (res) {
        // var elem = {"url":res.images[0].source}
        // photos.push(elem)
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
        FB.api('/me?fields=first_name,last_name,birthday,work,email,hometown,link,relationship_status', function (response) {
            console.log('basic info response is : ' + response)
            var obj = {
                "first": response.first_name,
                "last": response.last_name,
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
            console.log('education response is : ' + response)
            var education = []
            for( var i = 0 ; i < Object.keys(response.education).length; i++) {
                var obj = {
                    "school": response.education[i].school.name,
                    "type": response.education[i].type
                }
                education.push(obj)
            }
            return callback(education)
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
        FB.setAccessToken(token)
        FB.api('/me/photos?pretty=0&fields=likes.limit(0).summary(true)&since=2016-07-01&limit=30', function (response) {
            console.log('photos response is : ' + response)
            var array = [];
            for(var i = 0 ; i < Object.keys(response.data).length; i++){
                var element =  {};
                element.id = response.data[i].id;
                element.likes = response.data[i].likes.summary.total_count;
                array.push(element)
            }

            array.sort(function(a, b){
                b.likes - a.likes;
            });
            //
            // console.log(array);
            // console.log(array[0].likes);
            // console.log(array[0].id);
            var photos = [];

            async.series([
                function(callback){
                    for(var i = 0 ; i < 12 ; i ++) {
                        var img_id = array[i].id
                        parseNewFacebookPhotos(img_id, function (url) {
                            photos.push({"url": url})
                        })
                    }
                    return callback()
                }
            ], function(){
                return callback(photos);
            })
        })
    }
}
