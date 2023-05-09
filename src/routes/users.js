const express = require('express');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/Users');
const bcrypt = require('bcrypt');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Sanitize input
  const cleanUsername = username.replace(/[^a-zA-Z0-9]/g, '');
  const cleanPassword = password.replace(/[^a-zA-Z0-9]/g, '');

  const user = await UserModel.findOne({ username: cleanUsername });

  if (user) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(cleanPassword, 10);
  const newUser = new UserModel({ username: cleanUsername, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User created' });
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Sanitize input
  const cleanUsername = username.replace(/[^a-zA-Z0-9]/g, '');
  const cleanPassword = password.replace(/[^a-zA-Z0-9]/g, '');

  const user = await UserModel.findOne({ username: cleanUsername });

  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(cleanPassword, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

module.exports = router; 


