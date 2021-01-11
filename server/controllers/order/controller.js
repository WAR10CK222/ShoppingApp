const Order = require('../../repositories/order/model');


function get(req, res) {
    Order.find({}).populate('userId').populate('items').exec()
        .then(foundOrders => {
            for(let list of foundOrders){
                list.userId.password = undefined;
            }
            res.status(200).send({message : "Found Orders: ", foundOrders: foundOrders});
        })
        .catch(err => res.status(400).send({ message: 'Unknown Error', error: err}));
}

function findUserOrder(req, res) {
    Order.find({}).populate('userId').populate('items').exec()
        .then(foundOrders => {
            let sendUserOrder = [];
            for(let list of foundOrders){
                // console.log(list);
                if(list.userId._id == req.params.id){
                    list.userId.password = undefined;
                    sendUserOrder.push(list);
                }
            }
            res.status(200).send({message: "Found Orders: ", foundOrders : sendUserOrder})
        })
        .catch(err => res.status(400).send({ message: 'Unknown Error', error: err}));
}

function postNew(req, res) {
    (new Order(req.body)).save()
        .then(loggedOrder => res.status(200).send({message : "Order Sent: ", loggedOrder: loggedOrder}))
        .catch(err => res.status(400).send({ message: 'Unknown Error', error: err}));
}

function show(req, res) {
    Order.findById(req.params.id).populate('userId').populate('items').exec()
        .then(foundOrder => {
            // for(let list of foundOrders){
            //     list.userId.password = undefined;
            // }
            res.status(200).send({message : "Found Orders: ", foundOrder: foundOrder});
        })
        .catch(err => res.status(400).send({ message: 'Unknown Error', error: err}));
}

function remove(req, res) {
    Order.findByIdAndDelete(req.params.id)
        .then(deletedOrder => res.status(200).send({ message: 'Order Deleted', deletedOrder: deletedOrder}))
        .catch(err => res.status(400).send({ message: 'Unknown Error', error: err}));
}

module.exports = {
    get,
    postNew,
    show,
    remove,
    findUserOrder
}