const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    pendingMessages: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("User", userSchema);