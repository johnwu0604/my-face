var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var CircularJSON = require('circular-json')

passport.use(new FacebookStrategy({
        clientID: '1546707545396988',
        clientSecret: '7ff1392c924c3e724f28734e9c907ace',
        callbackURL: '/test'
    },
    function(accessToken, refreshToken, profile, cb) {
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

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    app.get('/auth/facebook',
        passport.authenticate('facebook'), function(req, res){
        console.log('Callback Test: ' + req)
            res.send(req);
        });

    app.get('/test', function(req, res) {
        console.log('Access Token Test: ' + CircularJSON.stringify(req));
        res.send('good');
    });

}