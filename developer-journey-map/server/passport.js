import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import passport from 'passport';
import User from "./mongodb/models/user.js";

const GOOGLE_CLIENT_ID = "799145484325-8o2poeemj5cf56i6lc0m1rb1lmfafrtm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_CLIENT_ID = "d0e34e16edc85ffb22f7";
const GITHUB_CLIENT_SECRET = "99db574f53ea69da627911050f258eef2a304e02";
const LINKEDIN_KEY = "86wa2tttlzoers";
const LINKEDIN_SECRET = "i8vE4O2CXEPIN129";

// check if user exists in database
function checkUser(profile, done) {
    const userId = profile.id;

    User.findOne({ id: userId }, (err, existingUser) => {
        if (err) {
            console.log(err);
            done(err);
        } else if (existingUser) {
            console.log('Welcome back!');
            done(null, profile);
        } else {
            const newUser = new User({
                id: userId,
            });
            newUser.save((err, savedUser) => {
                if (err) {
                    console.log(err);
                    done(err);
                } else {
                    console.log('New user added to database.');
                    done(null, profile);
                }
            });
        }
    });
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, function (accessToken, refreshToken, profile, done) {
    checkUser(profile, done);
}));

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    checkUser(profile, done);
}));

passport.use(new LinkedInStrategy({
    clientID: LINKEDIN_KEY,
    clientSecret: LINKEDIN_SECRET,
    callbackURL: "/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
}, function (token, tokenSecret, profile, done) {
    checkUser(profile, done);
}
));

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

export default passport