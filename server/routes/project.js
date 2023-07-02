const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// CREATE
router.post('/', authenticate, async (req, res) => {
    const project = new Project(req.body);
    try {
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ
router.get('/:id', authenticate, authorize(Project), async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send();
        }
        res.send(project);
    } catch (error) {
        res.status(500).send();
    }
});

// UPDATE
router.patch('/:id', authenticate, authorize(Project), async (req, res) => {
    if (res.permission !== 'update') {
        return res.status(403).send('Not authorized to make updates');
    }

    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) {
            return res.status(404).send();
        }
        res.send(project);
    } catch (error) {
        res.status(400).send(error);
    }

});

// DELETE
router.delete('/:id', authenticate, authorize(Project), async (req, res) => {
    if (res.permission !== 'update') {
        return res.status(403).send('Not authorized to make updates');
    }

    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send();
        }
        res.send(project);
    } catch (error) {
        res.status(500).send();
    }
});

// SHARE
router.post('/:id/share', authenticate, async (req, res) => {
    const projectId = req.params.id;
    const userToShareWith = req.body.userId;
    const permission = req.body.permission;
  
    try {
      const user = await User.findById(userToShareWith);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      Project.findById(projectId)
        .then(project => {
          if (project.owner.toString() !== req.user.toString()) {
            return res.status(403).send('Only the owner can share this project');
          }
  
          const alreadyShared = project.accessList.find(entry => entry.user.toString() === userToShareWith);
          if (alreadyShared) {
            return res.status(400).send('Project is already shared with this user');
          }
  
          project.accessList.push({ user: userToShareWith, permission });
          return project.save();
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