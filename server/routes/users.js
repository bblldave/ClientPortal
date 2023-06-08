const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User Registration
router.post('/register', async (req, res) => {
    const {username, password } = req.body;
    try {
        const user = new User({ username, password});
        await user.save();

        const userObj = user.toObject();
        delete userObj.password;

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

        res.status(200).send({token, user: userObj});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // If the user wasnt found or the password isnt right, send an error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Username or Password is incorrect'});
        }

        // If all is good, create json web token
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);

        // Send the token and user in the response
        const userObj = user.toObject();
        delete userObj.password;
        res.json({ token, user: userObj });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
})

module.exports = router;