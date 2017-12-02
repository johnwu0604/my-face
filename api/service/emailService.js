var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mtsaweb13579@gmail.com', // Your email id
        pass: 'mtsa.team' // Your password
    }
});


function postEmail(req, callback) {
    var mailOptions = {
        from: '"' + req.body.sender_name + '" <' + req.body.sender_email + '>',
        replyTo: '"' + req.body.sender_name + '" <' + req.body.sender_email + '>',
        to: req.body.user_email, // list of receivers
        subject: 'New email sent from your website', // Subject line
        html: 'You have received a new email from your website. <br><br> From: ' + req.body.sender_name + '<br><br>'
        + 'Email: ' + req.body.sender_email + '<br><br>'
        + 'Subject: ' + req.body.subject + '<br><br>'
        + req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            return callback(error)
        }else{
            console.log('Message sent: ' + info.response);
            return callback(info.response)

        };
    });
}

module.exports = {
    postEmail: function(req, callback) {
        postEmail(req, function(response){
            return callback(response)
        })
    }
}
