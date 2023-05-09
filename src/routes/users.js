const express = require('express');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/Users');
const bcrypt = require('bcrypt');

const router = express.Router();
router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {})

module.exports = router;   


