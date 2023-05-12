const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, unique: true }
});

export const UserModel = mongoose.model("users", UserSchema);
