const mongoose = require('mongoose');
const UserModel = require('../user/model');
const GroceryModel = require('../grocery/model');
module.exports = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Grocery'}],
    itemqty: {
        type: Number,
        required: false,
        default: 1
    }
})