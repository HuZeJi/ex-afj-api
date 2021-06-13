const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        authToken: String,
        email: String,
        firstName: String,
        lastName: String,
        provider: String,
        photoUrl: String,
        passwordIv: String,
        passwordContent: String,
        status: Boolean,
    },
    { _id: false }
);

module.exports = mongoose.model("user", UserSchema, "Users");
