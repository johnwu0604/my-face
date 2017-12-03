var s3 = require('s3')
var client = s3.createClient({
    maxAsyncS3: 20,
    s3Options: {
        accessKeyId: 'AKIAIH7SX6ZV5HCTLXCA',
        secretAccessKey: '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',
        region: 'us-east-1',
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
                Bucket: 'my-face-dev',
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