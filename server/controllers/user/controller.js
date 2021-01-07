const User = require('../../repositories/user/model');
const { hashSync, compareSync }= require('bcryptjs');

function get(req, res) {
    User.find({})
        .then(lists => {
            for(let list of lists){
                list.password = undefined;
            }
            res.status(200).send(lists);
        })
        .catch(err => res.status(400).send(err));
}

function login(req, res) {
    //console.log(req); //Get req sent from frontend
    User.findOne({email: req.body.email})
        .then(user => {
            if(!(req.body.email && req.body.password)){
                res.status(400).send({ message: "Email or Password is not provided!", err : {}});
            } if(!compareSync(req.body.password, user.password)){
                res.status(400).send({ message: "Incorrect Password", err : {}}); 
            } else {
                // res.session.user._id;
                user.password = undefined;
                res.status(200).send({message: "Logged User Successfully !!", user : user});
            }
        })
        .catch(err => res.status(400).send({ message: "Server Error", error : err }))
}

function postNew(req, res) {
    let hash = hashSync(req.body.password, 10);
    req.body.password = hash;
    if(!(req.body.email && req.body.password && req.body.phone && req.body.username)){
        res.status(400).send({ message: "Credentials are not provided!", err : {}});
    } else {
        (new User(req.body)).save()
            .then(user => {
                user.password = undefined;
                res.status(200).send({message: "Registered User Successfully !!", user : user})})
            .catch(err => res.status(400).send({ message: "Server Error", error : err}));
    }
}

function show(req, res) {
    User.findById(req.params.id)
        .then(foundUser => {
            foundUser.password = undefined;
            res.status(200).send(foundUser)
        })
        .catch(err => res.status(400).send(err));
}

function update(req, res) {
    if(req.body.password){
        let hash = hashSync(req.body.password, 10);
        req.body.password = hash;
    }
    User.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(updatedUser => res.status(200).send({ message: 'User Successfully updated', updatedUser : updatedUser}))
        .catch(err => res.status(400).send({ message : 'Unknown Error', error : err}));
}

function remove(req, res) {
    User.findByIdAndDelete(req.params.id)
        .then(deletedUser => res.status(200).send({ message: 'User Deleted Successfully', deletedUser : deletedUser}))
        .catch(err => res.status(400).send({ message : 'Unknown Error', error : err}));
}

module.exports = {
    get,
    login,
    postNew,
    show,
    update,
    remove
}