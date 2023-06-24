const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    color: {
        type: String,
        default: '#FFFFFF'
    },
    Notification: {
        taskUpdates: {
            type: Boolean,
            default: true
        },
        paymentReminders: {
            type: Boolean,
            default: true
        },
        newMessages: {
            type: Boolean,
            default: true
        }
    }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);