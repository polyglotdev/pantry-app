const express = require('express');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/Users');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const userRouter = express.Router();


userRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created' });

});

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;   
    const user = await UserModel.findOne({ username });
    
    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, userID: user._id });
});

module.exports = userRouter;


