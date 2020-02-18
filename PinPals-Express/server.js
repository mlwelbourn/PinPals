const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT;
require('./db/db.js');


//middleware
app.use(session({
    secret: 'ilovesecrets',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//controllers
const pinController = require('./controllers/pins.js')
app.use('/pins', pinController);

const userController = require('./controllers/users.js');
app.use('/auth', userController);



app.get('/', (req, res)=>{
    res.render('index.ejs', {
        message: req.session.message,
        logged: req.session.logged,
        username: req.session.username
    })
});

app.listen(port, ()=>{
    console.log('ALIVE AS FUCK BRUH');
});