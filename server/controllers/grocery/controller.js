const Grocery = require('../../repositories/grocery/model');

function get(req, res) {
    Grocery.find({})
        .then(groceries => res.send(groceries))
        .catch(err => console.log(err));
}

function postNew(req,res) {
    (new Grocery(req.body)).save()
        .then(grocery => res.send(grocery))
        .catch(err => res.send(err));
}

module.exports = {
    get,
    postNew
}