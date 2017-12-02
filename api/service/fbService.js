var FB = require('fb')

module.exports = {

    getFacebookId: function(token, callback) {
        FB.setAccessToken(token);
        FB.api('/me', function(response) {
            console.log('response is : ' + response)
            return callback(response.id)
        })
    }

}