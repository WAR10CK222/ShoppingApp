require('dotenv/config');
const express = require('express');
const app = express();
const cors = require('cors');
const orderRoutes = require('./controllers/order/routes');
const userRoutes = require('./controllers/user/routes');
const groceryRoutes = require('./controllers/grocery/routes');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//Configured Mongoose and Imported here...
const mongoose = require('./lib/mongoose');

/*
 CORS - Cross Origin Request Security
 localhost:3000 - backend api
 localhost:4200 - frontend
 Express by default reject any request made on other PORTs so to work with our frontend we use cors
*/


/*
* Client-sessions
* client-session
* 
*/
// const sessions = require('client-sessions');
// app.use(sessions({
//     cookieName : 'session',
//     secret : process.env.SECRET,
//     duration : 30 * 60 * 1000,
//     activeDuration : 5 * 60 * 1000,
//     httpOnly : true,
//     secure : true,
//     ephemeral : true
// }));

//Parsing JSON data via express.json() method.... bodyParser is now not required
app.use(express.json());
app.use('/api/order', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groceries', groceryRoutes);

app.get('/', (req, res) => {
    res.redirect('/api');
});

app.listen(3000, () => console.log('Server started at Port : 3000'));