const Order = require('../../repositories/order/model');


function get(req, res) {
    Order.find({}).populate('userId').populate('items').exec()
        .then(lists => {
            for(let list of lists){
                list.userId.password = undefined;
            }
            res.send(lists)
        })
        .catch(err => console.log(err));
}

function postNew(req, res) {
    (new Order(req.body)).save()
        .then(list => res.send(list))
        .catch(err => res.send(err));
}

function show(req, res) {
    Order.findById(req.params.id).populate('userId').populate('items').exec()
        .then(foundOrder => {
            foundOrder.userId.password = undefined;
            res.send(foundOrder)
        })
        .catch(err => console.log(err));
}

function remove(req, res) {
    Order.findByIdAndDelete(req.params.id)
        .then(deletedOrder => res.send({deletedOrder}))
        .catch(err => res.send(err));
}

module.exports = {
    get,
    postNew,
    show,
    remove
}