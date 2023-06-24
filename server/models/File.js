const mongoose = require('mongoose');

const FileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});

module.exports = mongoose.model('File', FileSchema);
