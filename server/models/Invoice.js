const mongoose = require('mongoose');

const InvoiceSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['paid', 'due', 'overdue'],
        default: 'due'
    }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
