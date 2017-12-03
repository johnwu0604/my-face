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
        var uploader = client.uploadDir(params)
        uploader.on('error', function (err) {
            console.error('Error uploading director:', err.stack)
            throw err.stack
        })
        uploader.on('end', function () {
            setTimeout(function() {
                console.log('Finished uploading directory')
                return callback()
            }, 3000)
        })
    }

}