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
        FB.api('/me?fields=first_name,last_name,birthday,education,work,email,hometown,languages,link,locations,relationship_status', function (response) {
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
            for(var i = 0; i < 12 ; i++){
                FB.api('/' + array[i].id +'?fields=images', function (res) {
                    // console.log(res.images[0].source);
                    console.log("okok")
                    var elem = {"url":res.images[0].source}
                    photos.push(elem)
                })
            }
            console.log("nono")
            return callback(photos);
        })
    },

    parseNewFacebookPhotos: function(array, callback){

    }
}
