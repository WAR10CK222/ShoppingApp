const Order = require('../../repositories/order/model');


function get(req, res) {
    Order.find({}).populate('userId').populate('items').exec()
        .then(lists => {
            for(let list of lists){
                list.userId.password = undefined;
            }
            res.status(200).send(lists)
        })
        .catch(err => res.status(400).send('Unknown Error', {err}));
}

function postNew(req, res) {
    (new Order(req.body)).save()
        .then(list => res.status(200).send(list))
        .catch(err => res.status(400).send('Unknown Error', {err}));
}

function show(req, res) {
    Order.findById(req.params.id).populate('userId').populate('items').exec()
        .then(foundOrder => {
            foundOrder.userId.password = undefined;
            res.status(200).send(foundOrder)
        })
        .catch(err => res.status(400).send('Unknown Error', {err}));
}

function remove(req, res) {
    Order.findByIdAndDelete(req.params.id)
        .then(deletedOrder => res.status(200).send('Order Deleted',{deletedOrder}))
        .catch(err => res.status(400).send('Unknown Error', {err}));
}

module.exports = {
    get,
    postNew,
    show,
    remove
}