const mongoose = require('mongoose');
require('dotenv').config();
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
