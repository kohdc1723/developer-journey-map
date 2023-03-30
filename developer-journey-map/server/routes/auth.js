import express from "express";
import passport from "passport";

const router = express.Router();
const DASHBOARD_URL = "http://localhost:3000";

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "success",
            user: req.user,
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    });
});
    
router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect("http://localhost:3000/login");
});

// google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: DASHBOARD_URL,
    failureRedirect: '/login/failed'
}));

// github
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: DASHBOARD_URL,
    failureRedirect: '/login/failed'
}));

// linkedin
router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: DASHBOARD_URL,
    failureRedirect: '/login/failed'
}));

export default router;