const express = require('express');
const File = require('../models/File');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// CREATE
router.post('/', authenticate, async (req, res) => {
    const file = new File(req.body);
    try {
        await file.save();
        res.status(201).send(file);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ
router.get('/:id', authenticate, async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).send();
        }
        res.send(file);
    } catch (error) {
        res.status(500).send();
    }
});

// UPDATE
router.patch('/:id', authenticate, async (req, res) => {
    try {
        const file = await File.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!file) {
            return res.satus(404).send();
        }
        res.send(file);
    } catch (error) {
        res.status(400).send(error);
    }

});

// DELETE
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) {
            return res.status(404).send();
        }
        res.send(file);
    } catch (error) {
        res.status(500).send();
    }
});

// SHARE
router.post('/:id/share', authenticate, async (req, res) => {
    const fileId = req.params.id;
    const userToShareWith = req.body.userId;
    const permission = req.body.permission;
  
    try {
      const user = await User.findById(userToShareWith);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      File.findById(fileId)
        .then(file => {
          if (file.owner.toString() !== req.user.toString()) {
            return res.status(403).send('Only the owner can share this file');
          }
  
          const alreadyShared = file.accessList.find(entry => entry.user.toString() === userToShareWith);
          if (alreadyShared) {
            return res.status(400).send('File is already shared with this user');
          }
  
          file.accessList.push({ user: userToShareWith, permission });
          return file.save();
        })
        .then(() => res.send('Shared Successfully'))
        .catch(error => {
          console.log(error);
          res.status(500).send('Internal server error');
        });
  
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;