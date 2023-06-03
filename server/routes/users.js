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

module.exports = router;