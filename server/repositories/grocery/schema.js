const mongoose = require('mongoose');

module.exports = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 100
    },
    amount: {
        type: Number,
        required: true,
        default: 3
    }
});