require('dotenv/config');
const mongoose = require('mongoose');

//Allows to use Mongoose promises, so that we don't to wait around if the database doesn't respond
mongoose.Promise = global.Promise;

//Mongoose Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Database Error : ' + err));

module.exports = mongoose;