const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// CREATE
router.post('/', authenticate, async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ
router.get('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

// UPDATE
router.patch('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.satus(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }

});

// DELETE
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

// SHARE
router.post('/:id/share', authenticate, async (req, res) => {
    const taskId = req.params.id;
    const userToShareWith = req.body.userId;
    const permission = req.body.permission;
  
    try {
      const user = await User.findById(userToShareWith);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      Task.findById(taskId)
        .then(task => {
          if (task.owner.toString() !== req.user.toString()) {
            return res.status(403).send('Only the owner can share this task');
          }
  
          const alreadyShared = task.accessList.find(entry => entry.user.toString() === userToShareWith);
          if (alreadyShared) {
            return res.status(400).send('Task is already shared with this user');
          }
  
          task.accessList.push({ user: userToShareWith, permission });
          return task.save();
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