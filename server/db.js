const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    userUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose is connected');
});

db.on('error', (err) => {
    console.log('Something went wrong connecting. ', err);
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose connection disconnected due to app termination');
        process.exit(0);
    });
});