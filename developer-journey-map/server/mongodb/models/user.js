import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: 1,
    }
});

const User = mongoose.model("User", UserSchema);

export default User;