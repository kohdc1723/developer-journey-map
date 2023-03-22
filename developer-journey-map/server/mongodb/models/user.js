import express from "express";
import mongoose from "mongoose";
// !!! DO NOT DELETE ALL THESE COMMENTED OUT CODE !!!
// import cookieParser from "cookie-parser";
// import jwt from "jsonwebtoken";

// const app = express();

// store token in cookie
// app.use(cookieParser());

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: 1,
    },
    token: {
        type: String,
    },
    tokenExpiration: {
        type: Number,
    },
});

// login - encryption(encode token)
// UserSchema.methods.generateToken = function (cb) {
//     var user = this;
//     // generate token using jsonwebtoken
//     var token = jwt.sign(user._id.toHexString(), "secretToken");
//     user.token = token;

//     user.save(function (err, user) {
//         if (err) return cb(err);
//         cb(null, user);
//     });
// };

// authenication - decryption(decode token)
// UserSchema.statics.findByToken = function (token, cb) {
//     var user = this;
//     // find user by id and then check if token from client matches token from DB
//     jwt.verify(token, 'secretToken', (err, decoded) => {
//         user.findOne({ "_id": decoded, "token": token }, (err, user) => {
//             if (err) return cb(err);
//             cb(null, user)
//         })
//     })
// }

const User = mongoose.model("User", UserSchema);

export default User;