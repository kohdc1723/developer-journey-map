import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import passport from 'passport';
import User from "./mongodb/models/user.js";

// check if user exists in database
async function checkUser(profile, done) {
    const userId = profile.id;

    try {
        let user = await User.findOne({ id: userId });
        if (!user) {
            user = await User.create({ id: userId });
            console.log('New user added to database.');
        } else {
            console.log('Welcome back!');
        }
        done(null, profile);
    } catch (err) {
        console.error(err);
        done(err);
    }
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, function (accessToken, refreshToken, profile, done) {
    checkUser(profile, done);
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    checkUser(profile, done);
}));

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
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
