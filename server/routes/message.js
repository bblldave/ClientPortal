const express = require('express');
const Message = require('../models/Message');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// CREATE
router.post('/', authenticate, async (req, res) => {
    const message = new Message(req.body);
    try {
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ
router.get('/:id', authenticate, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).send();
        }
        res.send(message);
    } catch (error) {
        res.status(500).send();
    }
});

// UPDATE
router.patch('/:id', authenticate, async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!message) {
            return res.satus(404).send();
        }
        res.send(message);
    } catch (error) {
        res.status(400).send(error);
    }

});

// DELETE
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).send();
        }
        res.send(message);
    } catch (error) {
        res.status(500).send();
    }
});

// SHARE
router.post('/:id/share', authenticate, async (req, res) => {
    const messageId = req.params.id;
    const userToShareWith = req.body.userId;
    const permission = req.body.permission;
  
    try {
      const user = await User.findById(userToShareWith);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      Message.findById(messageId)
        .then(message => {
          if (message.owner.toString() !== req.user.toString()) {
            return res.status(403).send('Only the owner can share this message');
          }
  
          const alreadyShared = message.accessList.find(entry => entry.user.toString() === userToShareWith);
          if (alreadyShared) {
            return res.status(400).send('Message is already shared with this user');
          }
  
          message.accessList.push({ user: userToShareWith, permission });
          return message.save();
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