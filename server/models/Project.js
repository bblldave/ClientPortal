const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['in progress', 'completed', 'pending'],
    default: 'pending'
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  files: [{
    type: Schema.Types.ObjectId,
    ref: 'File'
  }],
  invoices: [{
    type: Schema.Types.ObjectId,
    ref: 'Invoice'
  }],
  contentDocuments: [{
    type: Schema.Types.ObjectId,
    ref: 'Document'
  }]
});

module.exports = mongoose.model('Project', ProjectSchema);
