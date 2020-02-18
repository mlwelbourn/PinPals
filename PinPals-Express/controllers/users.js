const express = require('express');
const router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');

// Login Create route
router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });

        if(foundUser) {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.message = '';
                req.session.username = foundUser.username;
                req.session.logged = true;

                res.redirect('/authors');
            } else {
                req.session.message = 'Username or password is incorrect';
                res.redirect('/');
            }
        } else {
            req.session.message = 'Username or password is incorrect';
            res.redirect('/');
        }
    } catch(err) {
        res.send(err);
    }
})

router.post('/registration', async (req, res) => {
    
    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    const userDbEntry = {
        username: req.body.username,
        password: passwordHash,
        email: req.body.email
    }

    try {
        const createdUser = await User.create(userDbEntry);
        req.session.username = foundUser.username;
        req.session.logged = true;
        res.redirect('/authors');
    } catch(err) {
        res.send(err);
    }
})

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
})



module.exports = router;