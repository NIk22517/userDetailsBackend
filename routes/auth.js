const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).send('User registered successfully.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


//login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;







