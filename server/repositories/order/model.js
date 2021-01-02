const mongoose = require('mongoose');
require('../user/model');
require('../grocery/model');
const orderSchema = require('./schema');

module.exports = mongoose.model('Order', orderSchema);