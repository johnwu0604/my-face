var AmazonUtility = require('../util/amazonUtility')
var fs = require('fs');

module.exports = {
    postWebsiteData: function(data, callback){
        console.log(JSON.stringify(data.html));
        fs.writeFile('/template/index.html', JSON.stringify(data.html), function (err) {
            if (err) return console.log(err);
            AmazonUtility.uploadDir('../../template', function() {
                return callback()
            })
        })
    }
}
