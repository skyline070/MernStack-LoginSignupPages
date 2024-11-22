const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();



// Register
router.post('/register', async (req, res) => {
    // console.log("in regs")
    const { username, email, password } = req.body;
    // console.log(username, email, password, "ine 12")
    try {
        const user = new User({ username, email, password });
        // console.log(user, 'ínj')
        await user.save();
        res.json({ status: 200, message: 'Register Succesfully!' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Profile
router.get('/profile', async (req, res) => {
    const token = req.headers['authorization'];
    // console.log(req.headers.authorization, "ji")
    try {
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded, "j")
        const user = await User.findById(decoded.id).select('-password');
        // console.log(user, 'j 51')
        res.json({ status: 200, message: 'Fetched Succesfully', data: user })
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Update Profile
router.put('/profile', async (req, res) => {
    const token = req.headers['authorization'];
    try {
        if (!token) return res.status(401).json({ message: 'No token provided' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByIdAndUpdate(decoded.id, req.body, { new: true }).select('-password');
        res.json({ status: 200, message: 'úpdated successfully', data: user })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
