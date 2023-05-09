const express = require('express');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const UserModel = mongoose.model('User', UserSchema);
exports.UserModel = UserModel;
