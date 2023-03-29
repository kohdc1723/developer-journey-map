import express from "express";
import passport from "passport";

const router = express.Router();
const HOME_URL = "http://localhost:3000"

// router.get('/login/success', async (req, res) => {
//     try {
//         const foundUser = await User.findOne({ id: req.user.id });
//         if (!foundUser) {
//             return res.status(401).send("User not found");
//         }
//         foundUser.generateToken((err, user) => {
//             if (err) return res.status(400).send(err);
//             // save token to cookie
//             res.cookie("x_auth", user.token)
//                 .status(200)
//                 .json({
//                     success: true,
//                     userId: user.id,
//                     user: req.user,
//                 });
//         });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "success",
            user: req.user,
            cookies: req.cookies
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    });
});

// router.get('/logout', async (req, res) => {
//     try {
//         // find user and remove token from database
//         const updatedUser = await User.findOneAndUpdate({ id: req.user.id }, { $set: { token: "" } }, { new: true });
//         if (!updatedUser) return res.json({ success: false, message: "User not found" });
//         res.clearCookie('session');
//         req.logout();
//         res.redirect(LOGIN_URL);
//     } catch (err) {
//         console.log(err);
//         res.json({ success: false, err });
//     }
// });

router.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie("user");
    res.redirect(HOME_URL);
});

// google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: HOME_URL,
    failureRedirect: '/login/failed'
}));

// github
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: HOME_URL,
    failureRedirect: '/login/failed'
}));

// linkedin
router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: HOME_URL,
    failureRedirect: '/login/failed'
}));

export default router;