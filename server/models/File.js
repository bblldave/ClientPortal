const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    accessList: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        permission: { type: String, enum: ['read', 'update'], required: true }
    }]
});

module.exports = mongoose.model('File', FileSchema);
