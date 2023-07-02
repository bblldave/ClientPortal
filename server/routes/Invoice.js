const express = require('express');
const Invoice = require('../models/Invoice');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// CREATE
router.post('/', authenticate, async (req, res) => {
    const invoice = new Invoice(req.body);
    try {
        await invoice.save();
        res.status(201).send(invoice);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ
router.get('/:id', authenticate, async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send();
        }
        res.send(invoice);
    } catch (error) {
        res.status(500).send();
    }
});

// UPDATE
router.patch('/:id', authenticate, async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!invoice) {
            return res.satus(404).send();
        }
        res.send(invoice);
    } catch (error) {
        res.status(400).send(error);
    }

});

// DELETE
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).send();
        }
        res.send(invoice);
    } catch (error) {
        res.status(500).send();
    }
});

// SHARE
router.post('/:id/share', authenticate, async (req, res) => {
    const invoiceId = req.params.id;
    const userToShareWith = req.body.userId;
    const permission = req.body.permission;
  
    try {
      const user = await User.findById(userToShareWith);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      Invoice.findById(invoiceId)
        .then(invoice => {
          if (invoice.owner.toString() !== req.user.toString()) {
            return res.status(403).send('Only the owner can share this invoice');
          }
  
          const alreadyShared = invoice.accessList.find(entry => entry.user.toString() === userToShareWith);
          if (alreadyShared) {
            return res.status(400).send('Invoice is already shared with this user');
          }
  
          invoice.accessList.push({ user: userToShareWith, permission });
          return invoice.save();
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