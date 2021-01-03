const mongoose = require('mongoose');

/******
 * User Schema
 * Field:
 *      username: String required unique
 *      email : String required unique FORMAT : id@domain.com
 *      passoword : String required FORMAT : hash/salt method
 *      phone : Number
 *      isadmin : Boolean | Manage Orders
 ******/

 module.exports = new mongoose.Schema ({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone : {
        type: Number,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        required: true,
        default: false
    }
 });