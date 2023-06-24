const mongoose = require('mongoose');

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model('Message', MessageSchema);
