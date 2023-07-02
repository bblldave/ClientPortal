const express = require('express');
const Document = require('../models/Document');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// CREATE
router.post('/', authenticate, async (req, res) => {
    const document = new Document(req.body);
    try {
        await document.save();
        res.status(201).send(document);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ
router.get('/:id', authenticate, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).send();
        }
        res.send(document);
    } catch (error) {
        res.status(500).send();
    }
});

// UPDATE
router.patch('/:id', authenticate, async (req, res) => {
    try {
        const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!document) {
            return res.satus(404).send();
        }
        res.send(document);
    } catch (error) {
        res.status(400).send(error);
    }

});

// DELETE
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.id);
        if (!document) {
            return res.status(404).send();
        }
        res.send(document);
    } catch (error) {
        res.status(500).send();
    }
});

// SHARE
router.post('/:id/share', authenticate, async (req, res) => {
    const documentId = req.params.id;
    const userToShareWith = req.body.userId;
    const permission = req.body.permission;
  
    try {
      const user = await User.findById(userToShareWith);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      Document.findById(documentId)
        .then(document => {
          if (document.owner.toString() !== req.user.toString()) {
            return res.status(403).send('Only the owner can share this document');
          }
  
          const alreadyShared = document.accessList.find(entry => entry.user.toString() === userToShareWith);
          if (alreadyShared) {
            return res.status(400).send('Document is already shared with this user');
          }
  
          document.accessList.push({ user: userToShareWith, permission });
          return document.save();
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