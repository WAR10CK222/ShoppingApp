const Grocery = require('../../repositories/grocery/model');

function get(req, res) {
    Grocery.find({})
        .then(groceries => res.send(groceries))
        .catch(err => console.log(err));
}

module.exports = {
    get
}