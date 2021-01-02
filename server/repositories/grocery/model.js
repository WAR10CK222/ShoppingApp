const mongoose = require('mongoose');
const grocerySchema = require('./schema');

module.exports = mongoose.model('Grocery', grocerySchema);