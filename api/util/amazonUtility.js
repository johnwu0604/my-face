var s3 = require('s3')
var client = s3.createClient({
    maxAsyncS3: 20,
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
        signatureVersion: 'v3'
    }
})
var UUID = require('uuid/v1')

module.exports = {

    /**
     * Uploads a directory from the local environment to amazon S3
     *
     * @param localDir
     * @param done
     */
    uploadDir: function (localDir, callback) {
        var uuid = UUID()
        var params = {
            localDir: localDir,
            s3Params: {
                Bucket: process.env.AWS_BUCKET,
                Prefix: 'website/' + uuid,
                ACL: 'public-read'
            }
        }
        var url = 'https://s3.amazonaws.com/my-face-dev/website/' + uuid +'/index.html'
        var uploader = client.uploadDir(params)
        uploader.on('error', function(err) {
            console.error("unable to sync:", err.stack);
        });
        uploader.on('progress', function() {
            console.log("progress", uploader.progressAmount, uploader.progressTotal);
        });
        uploader.on('end', function() {
            console.log("done uploading")
            return callback(url)
        })
    }

}