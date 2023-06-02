const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    quote: {
        type: String
    }
}, { collection: 'user-details' });

const User = mongoose.model('user-model', userSchema);
module.exports = User;