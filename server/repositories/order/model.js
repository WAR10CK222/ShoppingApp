const mongoose = require('mongoose');
const orderSchema = require('./schema');

module.exports = mongoose.model('Order', orderSchema);