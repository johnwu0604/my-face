var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
        clientID: '1546707545396988',
        clientSecret: '7ff1392c924c3e724f28734e9c907ace',
        callbackURL: 'http://my-face-dev.us-east-1.elasticbeanstalk.com/test'
    },
    function(accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/facebook',
        passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    app.get('/test', function(req, res) {
        console.log(req);
        res.send('good');
    });

}