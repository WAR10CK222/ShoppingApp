const Grocery = require('../../repositories/grocery/model');

function get(req, res) {
    Grocery.find({})
        .then(groceries => res.status(200).send(groceries))
        .catch(err => res.status(400).send({ message : 'Unknown Error', error: err}));
}

function postNew(req,res) {
    (new Grocery(req.body)).save()
        .then(grocery => res.status(200).send(grocery))
        .catch(err => res.status(400).send({ message : 'Unknown Error', error: err}));
}

module.exports = {
    get,
    postNew
}