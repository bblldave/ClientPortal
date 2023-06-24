const mongoose = require('mongoose');

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['in progress', 'completed', 'pending'],
        default: 'pending'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);
