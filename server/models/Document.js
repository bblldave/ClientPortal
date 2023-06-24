const mongoose = require('mongoose');

const DocumentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'rejected', 'pending', 'in progress', 'changes requested'],
        default: 'pending'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});

module.exports = mongoose.model('Document', DocumentSchema);