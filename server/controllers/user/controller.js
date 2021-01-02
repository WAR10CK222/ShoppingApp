const User = require('../../repositories/user/model');
const { hashSync, compareSync }= require('bcryptjs');

function get(req, res) {
    User.find({})
        .then(lists => {
            for(let list of lists){
                list.password = undefined;
            }
            res.send(lists)
        })
        .catch(err => res.send(err));
}

function postNew(req, res) {
    let hash = hashSync(req.body.password, 10);
    req.body.password = hash;
    (new User(req.body)).save()
        .then(list => res.send(list))
        .catch(err => res.send(err));
}

function show(req, res) {
    User.findById(req.params.id)
        .then(foundUser => {
            foundUser.password = undefined;
            res.send(foundUser)
        })
        .catch(err => console.log(err));
}

function update(req, res) {
    if(req.body.password){
        let hash = hashSync(req.body.password, 10);
        req.body.password = hash;
    }
    User.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(updatedUser => res.send(updatedUser))
        .catch(err => res.send(err));
}

function remove(req, res) {
    User.findByIdAndDelete(req.params.id)
        .then(deletedUser => res.send({deletedUser}))
        .catch(err => res.send(err));
}

module.exports = {
    get,
    postNew,
    show,
    update,
    remove
}