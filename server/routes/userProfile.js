const express = require('express');
const UserProfile = require('../models/UserProfile');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// CREATE
router.post('/', authenticate, async (req, res) => {
    const userProfile = new UserProfile(req.body);
    try {
        await userProfile.save();
        res.status(201).send(userProfile);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ
router.get('/:id', authenticate, async (req, res) => {
    try {
        const userProfile = await UserProfile.findById(req.params.id);
        if (!userProfile) {
            return res.status(404).send();
        }
        res.send(userProfile);
    } catch (error) {
        res.status(500).send();
    }
});

// UPDATE
router.patch('/:id', authenticate, async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!userProfile) {
            return res.satus(404).send();
        }
        res.send(userProfile);
    } catch (error) {
        res.status(400).send(error);
    }

});

// DELETE
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (!userProfile) {
            return res.status(404).send();
        }
        res.send(userProfile);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;