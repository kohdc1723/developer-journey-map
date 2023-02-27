import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import passport from 'passport';

const GOOGLE_CLIENT_ID = "799145484325-8o2poeemj5cf56i6lc0m1rb1lmfafrtm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_CLIENT_ID = "d0e34e16edc85ffb22f7";
const GITHUB_CLIENT_SECRET = "99db574f53ea69da627911050f258eef2a304e02";
const LINKEDIN_KEY = "86wa2tttlzoers";
const LINKEDIN_SECRET = "i8vE4O2CXEPIN129";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, function (accessToken, refreshToken, profile, done) {
    done(null, profile);
}));

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    done(null, profile);
}));

passport.use(new LinkedInStrategy({
    clientID: LINKEDIN_KEY,
    clientSecret: LINKEDIN_SECRET,
    callbackURL: "/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
}, function (token, tokenSecret, profile, done) {
    done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

export default passport