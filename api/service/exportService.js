var AmazonUtility = require('../util/amazonUtility')
var fs = require('fs');

module.exports = {
    postWebsiteData: function(data, callback){
        fs.writeFile('template/index.html', data.html, function (err) {
            if (err) return console.log(err);
            AmazonUtility.uploadDir('template', function() {
                return callback()
            })
        })
    }
}
