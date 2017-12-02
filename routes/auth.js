var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var CircularJSON = require('circular-json')

passport.use(new Strategy({
        clientID: '1546707545396988',
        clientSecret: '7ff1392c924c3e724f28734e9c907ace',
        callbackURL: '/test'
    },
    function(accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        var user = {
            'email': profile.emails[0].value,
            'name' : profile.name.givenName + ' ' + profile.name.familyName,
            'id'   : profile.id,
            'token': accessToken
        }
        return cb(null, user);
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
        console.log('Access Token Test: ' + CircularJSON.stringify(req));
        res.send('good');
    });

}