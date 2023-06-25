const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, (req, res) => {
    res.json({ msg: 'Auth route' })
});

module.exports = router;