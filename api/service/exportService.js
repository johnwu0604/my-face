

module.exports = {
    postWebsiteData: function(data, callback){
        console.log(JSON.stringify(data.html));
        return callback();
    }
}
